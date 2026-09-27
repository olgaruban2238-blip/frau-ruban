import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'lib', 'data.ts')
const TRANSLATIONS_FILE = path.join(process.cwd(), 'lib', 'translations.ts')

// GET - получить все песни (уже есть в lib/data.ts, этот endpoint для будущего)
export async function GET() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8')
    return NextResponse.json({ success: true, content })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read songs' }, { status: 500 })
  }
}

// POST - добавить новую песню (только для админа)
export async function POST(req: NextRequest) {
  try {
    // Проверка авторизации
    const admin = await verifyAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, youtubeUrl, genre, story, language = 'Русский', translations } = body

    if (!title || !youtubeUrl) {
      return NextResponse.json({ error: 'Title and YouTube URL are required' }, { status: 400 })
    }

    // Читаем текущий файл
    let content = await fs.readFile(DATA_FILE, 'utf-8')

    // Находим массив songs
    const songsMatch = content.match(/export const songs = \[([\s\S]*?)\n\]/m)
    if (!songsMatch) {
      return NextResponse.json({ error: 'Could not parse songs array' }, { status: 500 })
    }

    // Находим последний ID
    const idMatches = content.match(/id: (\d+)/g)
    const maxId = idMatches 
      ? Math.max(...idMatches.map(m => parseInt(m.match(/\d+/)![0])))
      : 0
    const newId = maxId + 1

    // Создаём новую песню
    const newSong = {
      id: newId,
      title,
      year: new Date().getFullYear(),
      genre: genre || 'Авторская песня',
      language,
      story: story || 'Новая песня',
      views: 0,
      featured: false,
      youtubeUrl,
    }

    // Форматируем новую песню как строку
    const newSongStr = `  {
    id: ${newSong.id},
    title: '${newSong.title.replace(/'/g, "\\'")}',
    year: ${newSong.year},
    genre: '${newSong.genre.replace(/'/g, "\\'")}',
    language: '${newSong.language}',
    story: '${newSong.story.replace(/'/g, "\\'")}',
    views: ${newSong.views},
    featured: ${newSong.featured},
    youtubeUrl: '${newSong.youtubeUrl}',
  },`

    // Вставляем новую песню перед закрывающей скобкой массива
    const songsArrayEnd = content.indexOf('\n]', content.indexOf('export const songs = ['))
    content = content.slice(0, songsArrayEnd) + '\n' + newSongStr + content.slice(songsArrayEnd)

    // Сохраняем файл
    await fs.writeFile(DATA_FILE, content, 'utf-8')

    // Если есть переводы, добавляем их в translations.ts
    if (translations && (translations.en || translations.de)) {
      let translationsContent = await fs.readFile(TRANSLATIONS_FILE, 'utf-8')

      // Добавляем английский перевод если есть
      if (translations.en && (translations.en.genre || translations.en.story)) {
        const enEntry = `    ${newId}: { language: 'Russian', genre: '${(translations.en.genre || '').replace(/'/g, "\\'")}', story: '${(translations.en.story || '').replace(/'/g, "\\'")}' },`
        // Простая замена: находим строку с 12: в en секции и добавляем после неё
        const enPattern = /    12: \{ language: 'Russian', genre: '[^']+', story: '[^']+' \},/
        translationsContent = translationsContent.replace(enPattern, (match) => match + '\n' + enEntry)
      }

      // Добавляем немецкий перевод если есть
      if (translations.de && (translations.de.genre || translations.de.story)) {
        const deEntry = `    ${newId}: { language: 'Russisch', genre: '${(translations.de.genre || '').replace(/'/g, "\\'")}', story: '${(translations.de.story || '').replace(/'/g, "\\'")}' },`
        // Простая замена: находим строку с 12: в de секции и добавляем после неё
        const dePattern = /    12: \{ language: 'Russisch', genre: '[^']+', story: '[^']+' \},/
        // Заменяем только последнее вхождение (в de секции)
        const deMatches = [...translationsContent.matchAll(dePattern)]
        if (deMatches.length > 0) {
          const lastMatch = deMatches[deMatches.length - 1]
          const insertPosition = lastMatch.index + lastMatch[0].length
          translationsContent = translationsContent.slice(0, insertPosition) + '\n' + deEntry + translationsContent.slice(insertPosition)
        }
      }

      await fs.writeFile(TRANSLATIONS_FILE, translationsContent, 'utf-8')
    }

    return NextResponse.json({ success: true, song: newSong })
  } catch (error) {
    console.error('Error adding song:', error)
    return NextResponse.json({ error: 'Failed to add song' }, { status: 500 })
  }
}

// DELETE - удалить песню (только для админа)
export async function DELETE(req: NextRequest) {
  try {
    // Проверка авторизации
    const admin = await verifyAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Song ID is required' }, { status: 400 })
    }

    // Читаем текущий файл
    let content = await fs.readFile(DATA_FILE, 'utf-8')

    // Находим и удаляем песню по ID
    const songPattern = new RegExp(`  \\{\\s*id: ${id},[\\s\\S]*?\\},?\\n`, 'm')
    const newContent = content.replace(songPattern, '')

    if (newContent === content) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 })
    }

    // Сохраняем файл
    await fs.writeFile(DATA_FILE, newContent, 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting song:', error)
    return NextResponse.json({ error: 'Failed to delete song' }, { status: 500 })
  }
}
