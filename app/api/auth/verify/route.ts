import { NextRequest, NextResponse } from 'next/server'
import * as crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET

// Проверка наличия переменной окружения в продакшене
if (process.env.NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('Missing required environment variable: JWT_SECRET')
}

function verifyToken(token: string): { username: string; role: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const [headerB64, payloadB64, signatureB64] = parts
    
    // Verify signature
    const data = `${headerB64}.${payloadB64}`
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(data)
      .digest('base64url')
    
    if (signatureB64 !== expectedSignature) return null
    
    // Decode payload
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
    
    // Check expiration
    if (payload.exp && payload.exp < Date.now() / 1000) return null
    
    return payload
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Верифицируем токен
    const payload = verifyToken(token)

    if (payload && payload.role === 'admin') {
      return NextResponse.json({ authenticated: true, username: payload.username })
    }

    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
