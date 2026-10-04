import type { Metadata } from 'next'
import { type Viewport } from 'next'
import { LanguageProvider } from '@/lib/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Жизнь удивительна — Ольга Рубан',
  description: 'История одного случайного звонка, двух людей и сотен песен, которые однажды начали жить своей собственной жизнью.',
  openGraph: {
    title: 'Жизнь удивительна — Ольга Рубан',
    description: 'История одного случайного звонка, двух людей и сотен песен.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Отключение правого клика
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
              });

              // Отключение горячих клавиш для копирования
              document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || e.key === 'a' || e.key === 'A')) {
                  e.preventDefault();
                  return false;
                }
                if (e.metaKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || e.key === 'a' || e.key === 'A')) {
                  e.preventDefault();
                  return false;
                }
              });

              // Отключение drag текста
              document.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
              });
            `,
          }}
        />
      </head>
      <body className="noise">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
