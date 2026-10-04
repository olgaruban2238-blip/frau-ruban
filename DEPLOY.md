# 🚀 Инструкция по деплою сайта

## Вариант 1: Vercel (Рекомендуется - самый простой)

### Через веб-интерфейс:

1. **Зарегистрируйся на Vercel**
   - Открой https://vercel.com
   - Нажми "Sign Up" (можно через GitHub)

2. **Загрузи проект**
   - Нажми "Add New Project"
   - Выбери "Import Git Repository" или "Upload"
   - Если загружаешь папку напрямую, просто перетащи её

3. **Настрой переменные окружения**
   В разделе "Environment Variables" добавь:
   ```
   ADMIN_USERNAME = Olgaruban54234_
   ADMIN_PASSWORD = $*_D49858_Dbv_%fb-_-
   JWT_SECRET = a8f5e9c2b1d4f7a3e6b8c1d9f2e5a7b4c8d1e3f6a9b2c5d8e1f4a7b9c2d5e8f1
   ```

4. **Деплой**
   - Нажми "Deploy"
   - Подожди 2-3 минуты
   - Готово! Получишь ссылку типа `your-project.vercel.app`

### Через командную строку:

```bash
# Установи Vercel CLI
npm i -g vercel

# В папке проекта
vercel login
vercel

# Добавь переменные окружения
vercel env add ADMIN_USERNAME
vercel env add ADMIN_PASSWORD
vercel env add JWT_SECRET

# Production деплой
vercel --prod
```

---

## Вариант 2: Netlify

1. **Зарегистрируйся на Netlify**
   - https://netlify.com

2. **Установи плагин Next.js**
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```

3. **Создай файл netlify.toml**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

4. **Загрузи проект**
   - Drag & Drop папки на Netlify
   - Или подключи Git репозиторий

5. **Добавь переменные окружения**
   - Site settings → Environment variables
   - Добавь `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`

---

## Вариант 3: Railway

1. **Зарегистрируйся на Railway**
   - https://railway.app

2. **Создай новый проект**
   - "New Project" → "Deploy from GitHub"
   - Или "Empty Project" → загрузи файлы

3. **Добавь переменные**
   - Variables → Add все 3 переменные

4. **Деплой происходит автоматически**

---

## Вариант 4: DigitalOcean App Platform

1. **Зарегистрируйся на DigitalOcean**
   - https://www.digitalocean.com

2. **Создай приложение**
   - Apps → Create App
   - Connect GitHub или загрузи файлы

3. **Настрой**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment Variables: добавь все 3

4. **Deploy**

---

## Вариант 5: Своё VPS (для продвинутых)

```bash
# На сервере
git clone your-repo
cd your-repo
npm install
npm run build

# Установи PM2
npm install -g pm2

# Запусти
pm2 start npm --name "frau-ruban" -- start
pm2 save
pm2 startup
```

---

## ⚠️ Важные моменты

1. **Переменные окружения**
   - Всегда добавляй их на хостинге!
   - Без них сайт не будет работать

2. **Файл .env.local**
   - НЕ загружай его на хостинг
   - Он только для локальной разработки

3. **Домен**
   - После деплоя можешь подключить свой домен
   - В настройках хостинга: Settings → Domains

4. **Автообновление**
   - При подключении через Git - сайт будет обновляться автоматически при каждом коммите

---

## 📊 Проверка после деплоя

✅ Открывается главная страница
✅ Переключение языков работает
✅ Можно залогиниться как админ (правый верхний угол)
✅ Комментарии сохраняются
✅ Песни отображаются с кнопками YouTube

---

## 🆘 Проблемы?

**Сайт не открывается:**
- Проверь, что сборка завершилась успешно
- Посмотри логи на хостинге

**Не могу войти как админ:**
- Проверь, что переменные окружения добавлены правильно
- Без пробелов, точно такие же как в инструкции

**Комментарии не сохраняются:**
- Это нормально на Vercel/Netlify (serverless)
- Нужна база данных для постоянного хранения
- Можно добавить позже (MongoDB, PostgreSQL)

---

Удачи! 🎉
