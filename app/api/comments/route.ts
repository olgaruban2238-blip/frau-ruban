import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { verifyAdmin } from '@/lib/auth'

// Список запрещенных слов (мат и спам)
const FORBIDDEN_WORDS = [
  // Русский мат
  'бля', 'сука', 'пизд', 'ебал', 'хуй', 'ёб', 'еб', 'хер', 'манд', 'пидор', 'гандон',
  // Английский мат
  'fuck', 'shit', 'bitch', 'ass', 'damn', 'dick', 'cock', 'pussy', 'cunt',
  // Немецкий мат
  'scheiße', 'scheisse', 'arsch', 'fick',
  // Спам слова
  'casino', 'viagra', 'porn', 'xxx', 'bitcoin', 'crypto', 'loan', 'click here',
]

const DATA_FILE = path.join(process.cwd(), 'data', 'comments.json')

interface Comment {
  id: string
  name: string
  text: string
  timestamp: number
  ip: string
}

interface CommentsData {
  comments: Comment[]
  ips: string[]
  lastCommentTime: Record<string, number> // IP -> timestamp последнего комментария
}

// Функция для получения IP адреса
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const real = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (real) {
    return real
  }
  
  return 'unknown'
}

// Функция проверки на мат
function containsForbiddenWords(text: string): boolean {
  const lowerText = text.toLowerCase()
  return FORBIDDEN_WORDS.some(word => lowerText.includes(word))
}

// Функция для чтения комментариев
async function readComments(): Promise<CommentsData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    // Обеспечиваем наличие lastCommentTime
    return {
      comments: parsed.comments || [],
      ips: parsed.ips || [],
      lastCommentTime: parsed.lastCommentTime || {},
    }
  } catch {
    return { comments: [], ips: [], lastCommentTime: {} }
  }
}

// Функция для сохранения комментариев
async function saveComments(data: CommentsData): Promise<void> {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

// GET - получить все комментарии
export async function GET() {
  try {
    const data = await readComments()
    // Не возвращаем IP адреса клиенту
    const publicComments = data.comments.map(({ ip, ...comment }) => comment)
    return NextResponse.json({ comments: publicComments })
  } catch (error) {
    console.error('Error reading comments:', error)
    return NextResponse.json({ error: 'Failed to load comments' }, { status: 500 })
  }
}

// POST - добавить комментарий
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, text } = body

    // Валидация
    if (!name || !text) {
      return NextResponse.json({ error: 'Name and text are required' }, { status: 400 })
    }

    if (name.length > 50) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 })
    }

    if (text.length > 500) {
      return NextResponse.json({ error: 'Comment is too long' }, { status: 400 })
    }

    if (text.length < 3) {
      return NextResponse.json({ error: 'Comment is too short' }, { status: 400 })
    }

    // Проверка на мат и спам
    if (containsForbiddenWords(name) || containsForbiddenWords(text)) {
      return NextResponse.json({ error: 'Comment contains inappropriate content' }, { status: 400 })
    }

    const clientIp = getClientIp(request)
    const data = await readComments()

    // АНТИ-ФЛУД: Проверяем время последнего комментария от этого IP
    const now = Date.now()
    const lastTime = data.lastCommentTime[clientIp]
    const FLOOD_TIMEOUT = 60 * 1000 // 1 минута в миллисекундах

    if (lastTime && (now - lastTime) < FLOOD_TIMEOUT) {
      const secondsLeft = Math.ceil((FLOOD_TIMEOUT - (now - lastTime)) / 1000)
      return NextResponse.json(
        { error: `Please wait ${secondsLeft} seconds before posting again` },
        { status: 429 }
      )
    }

    // Проверка: один комментарий на IP
    if (data.ips.includes(clientIp)) {
      return NextResponse.json({ error: 'You have already left a comment' }, { status: 429 })
    }

    // Создаем новый комментарий
    const newComment: Comment = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      text: text.trim(),
      timestamp: Date.now(),
      ip: clientIp,
    }

    data.comments.push(newComment)
    data.ips.push(clientIp)
    data.lastCommentTime[clientIp] = now

    await saveComments(data)

    // Возвращаем комментарий без IP
    const { ip, ...publicComment } = newComment
    return NextResponse.json({ comment: publicComment }, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}


// DELETE - удалить комментарий (только для админа)
export async function DELETE(request: NextRequest) {
  try {
    // Проверяем, что пользователь - админ
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const commentId = searchParams.get('id')

    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID required' }, { status: 400 })
    }

    const data = await readComments()
    const commentIndex = data.comments.findIndex(c => c.id === commentId)

    if (commentIndex === -1) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    // Удаляем комментарий и его IP из списка
    const removedComment = data.comments[commentIndex]
    data.comments.splice(commentIndex, 1)
    
    // Удаляем IP, чтобы пользователь мог оставить новый комментарий
    const ipIndex = data.ips.indexOf(removedComment.ip)
    if (ipIndex !== -1) {
      data.ips.splice(ipIndex, 1)
    }

    // Удаляем время последнего комментария для этого IP
    if (data.lastCommentTime && data.lastCommentTime[removedComment.ip]) {
      delete data.lastCommentTime[removedComment.ip]
    }

    await saveComments(data)

    return NextResponse.json({ success: true, message: 'Comment deleted' })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
  }
}
