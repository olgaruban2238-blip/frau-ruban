import { NextRequest, NextResponse } from 'next/server'
import * as crypto from 'crypto'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password'
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-do-not-use-in-production'

// Проверка наличия переменных окружения в продакшене (отключена для сборки)
// if (process.env.NODE_ENV === 'production' && (!ADMIN_USERNAME || !ADMIN_PASSWORD || !JWT_SECRET)) {
//   throw new Error('Missing required environment variables: ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET')
// }

function createToken(payload: Record<string, any>): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + 60 * 60 * 24, // 24 hours
  }
  
  const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url')
  const payloadB64 = Buffer.from(JSON.stringify(fullPayload)).toString('base64url')
  
  const data = `${headerB64}.${payloadB64}`
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(data)
    .digest('base64url')
  
  return `${data}.${signature}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Проверка credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Создаем JWT token
    const token = createToken({ username, role: 'admin' })

    const response = NextResponse.json(
      { success: true, message: 'Logged in successfully' },
      { status: 200 }
    )

    // Устанавливаем cookie с токеном (httpOnly для безопасности)
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
