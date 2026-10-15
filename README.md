# Realtime Analytics Dashboard — Frontend

Интерактивный дашборд для отслеживания рыночных данных в реальном времени. Криптовалюты (Bybit) и акции (Yahoo Finance) — в едином интерфейсе с drag-and-drop редактором досок.

## 🛠 Стек

| Компонент | Технология |
|-----------|------------|
| Фреймворк | Next.js 16 (App Router) |
| Язык | TypeScript |
| Стили | Tailwind CSS v4 |
| Серверное состояние | TanStack Query v5 |
| Формы | react-hook-form + Zod |
| Headless UI | Radix UI Primitives |
| Графики | Recharts |
| Слайдеры | Swiper |
| Сетка дашборда | react-grid-layout |
| Command palette | cmdk |
| Иконки | lucide-react |
| HTTP-клиент | axios |

## 🚀 Быстрый старты

### Требования

- Node.js 20+
- npm / pnpm / yarn
- Запущенный бэкенд (см. `backend/README.md`)

### 1. Установка

```bash
git clone <repo-url>
cd frontend
npm install
```

### 2. Переменные окружения

```bash
cp .env.example .env.local
```

### 3. Запуск

```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## ⚙️ Переменные окружения

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_API_URL` | URL бэкенда (например, `http://localhost:8000`) |
| `NEXT_PUBLIC_WS_URL` | URL WebSocket-эндпоинта (например, `ws://localhost:8000/ws/stream`) |

## 📜 Скрипты

```bash
npm run dev      # Dev-сервер с hot-reload
npm run build    # Продакшен-сборка
npm run start    # Запуск собранного приложения
npm run lint     # ESLint
```

## 🐳 Docker

### Сборка и запуск

```bash
docker build -t market-frontend .
docker run -p 3000:3000 --env-file .env.local market-frontend
```

Используется **standalone output** Next.js — минимальный образ без dev-зависимостей.

## 🔌 Работа с бэкендом

Все запросы идут на `NEXT_PUBLIC_API_URL`. Cookies отправляются автоматически благодаря `withCredentials: true` в axios instance.

**CORS на бэке** должен разрешать origin фронта — это настраивается через `CORS_ORIGINS` в `.env` бэкенда.

## 📝 Лицензия

MIT