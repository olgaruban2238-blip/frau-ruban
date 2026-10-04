import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ADMIN_USERNAME: process.env.ADMIN_USERNAME ? 'SET' : 'NOT_SET',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'SET' : 'NOT_SET',
    JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
    NODE_ENV: process.env.NODE_ENV,
  })
}
