# Avito Moderation System

Система модерации объявлений для стажерского [задания](https://github.com/avito-tech/tech-internship/blob/main/Tech%20Internships/Frontend/Frontend-trainee-assignment-autumn-2025/Frontend-trainee-assignment-autumn-2025.md) Avito.

## Структура проекта

- `frontend/` - React приложение (Vite + TypeScript)
- `tech-int3-server/` - Express API сервер

## Быстрый старт с Docker

### Запуск всего проекта

Из корня проекта выполните:

```bash
docker-compose up -d
```

После запуска:
- Frontend: http://localhost:80
- Backend API: http://localhost:3001/api/v1

### Остановка

```bash
docker-compose down
```

### Пересборка после изменений

```bash
docker-compose up -d --build
```

### Просмотр логов

```bash
# Все сервисы
docker-compose logs -f

# Только frontend
docker-compose logs -f frontend

# Только backend
docker-compose logs -f backend
```

## Локальная разработка

### Backend

```bash
cd tech-int3-server
npm install
npm run dev
```

Backend будет доступен на http://localhost:3001

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на http://localhost:5173

## Технологии

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS 4.x
- shadcn/ui
- React Query
- React Router
- Recharts

### Backend
- Node.js
- Express
- REST API


