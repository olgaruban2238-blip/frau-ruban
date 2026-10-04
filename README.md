# Сайт Ольги Рубан

Персональный сайт поэтессы Ольги Рубан с архивом песен, историями и комментариями.

## 🚀 Деплой на Vercel

### Шаг 1: Подготовка
1. Зарегистрируйся на [Vercel](https://vercel.com)
2. Установи Vercel CLI (опционально):
   ```bash
   npm i -g vercel
   ```

### Шаг 2: Деплой через сайт Vercel (самый простой способ)
1. Открой [vercel.com](https://vercel.com)
2. Нажми "Add New Project"
3. Импортируй этот проект (можно загрузить через Git или напрямую)
4. Vercel автоматически определит Next.js проект
5. **ВАЖНО:** Добавь переменные окружения (Environment Variables):
   - `ADMIN_USERNAME` = `Olgaruban54234_`
   - `ADMIN_PASSWORD` = `$*_D49858_Dbv_%fb-_-`
   - `JWT_SECRET` = `a8f5e9c2b1d4f7a3e6b8c1d9f2e5a7b4c8d1e3f6a9b2c5d8e1f4a7b9c2d5e8f1`
6. Нажми "Deploy"

### Шаг 3: Деплой через CLI (альтернатива)
```bash
# В корневой папке проекта
vercel

# Для продакшн деплоя
vercel --prod
```

### Шаг 4: Настройка переменных через CLI
```bash
# Добавь секреты
vercel env add ADMIN_USERNAME
vercel env add ADMIN_PASSWORD
vercel env add JWT_SECRET
```

## 🔧 Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Открой http://localhost:3000
```

## 📦 Сборка

```bash
# Production build
npm run build

# Запуск production сервера
npm start
```

## 🌍 Другие хостинги

### Netlify
1. Создай файл `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```
2. Добавь переменные окружения в настройках Netlify

### Railway
1. Подключи GitHub репозиторий
2. Railway автоматически определит Next.js
3. Добавь переменные окружения

### DigitalOcean App Platform
1. Создай новое приложение
2. Подключи репозиторий
3. Добавь переменные окружения
4. Деплой

## 🔐 Переменные окружения

Создай файл `.env.local` для локальной разработки:

```env
ADMIN_USERNAME=Olgaruban54234_
ADMIN_PASSWORD=$*_D49858_Dbv_%fb-_-
JWT_SECRET=a8f5e9c2b1d4f7a3e6b8c1d9f2e5a7b4c8d1e3f6a9b2c5d8e1f4a7b9c2d5e8f1
```

**ВАЖНО:** Никогда не коммить `.env.local` в Git!

## 📝 Функции

- ✅ Многоязычность (RU, EN, DE)
- ✅ Архив песен с YouTube ссылками
- ✅ Система комментариев с анти-флуд защитой
- ✅ Фильтр мата (RU, EN, DE)
- ✅ Админ-панель для управления
- ✅ Защита авторских прав
- ✅ Адаптивный дизайн

## 🛠 Технологии

- **Framework:** Next.js 16
- **UI:** React 19, Framer Motion, Tailwind CSS
- **Auth:** JWT (crypto module)
- **Hosting:** Vercel (рекомендуется)

## 📧 Контакты

Сайт: [ваш-домен.vercel.app](https://ваш-домен.vercel.app)

---

© Все стихи защищены авторским правом
