# Traectoria 42

MVP-приложение для управления карточками(задачи и др) через Kanban-доски с многоосевым (матричным) подходом.

## Основные возможности

### Матричная доска (Matrix Board)
- **Многоосевая сетка** — доска состоит из N осей, каждая со своими точками. Карточки размещаются по координатам (строка × колонка).
- **Drag & Drop** — перетаскивание карточек между ячейками, сортировка колонок и строк (на базе `@dnd-kit`).
- **Динамические оси** — пользователь выбирает, какие оси отображаются как колонки, а какие как строки. Кнопка «Swap» меняет их местами.
- **Настройка размера** — слайдер для изменения ширины ячеек доски.
- **Тёмная/светлая тема** — переключатель через `ThemeProvider`.
- **Изолированные карточки** — карточка состоит из бордового контракта (`boardId`, `features`) и семантического контента (`title`, `description`, `author`, `assignee`, `dueDate`, `tags`).

### Архитектура
Проект следует **Feature-Sliced Design (FSD)**:

| Слой | Назначение |
|------|------------|
| `app/` | Корневой компонент, лейауты, провайдеры |
| `pages/` | Страницы приложения |
| `widgets/` | Композитные виджеты (например, `matrix/` — вся матричная доска) |
| `features/` | Интерактивные функциональные блоки |
| `entities/` | Бизнес-сущности (`matrix-panel/`) |
| `shared/` | Утилиты, UI-примитивы, API, хуки, HOC |

### Ключевые паттерны
- **MobX stores** — доменные классы (`Board`, `Card`, `BoardAxis`, `MatrixBoardStore`) аннотируются через `makeAutoObservable(autoBind: true)`. UI через `observer` HOC.
- **DTO-first data flow** — API возвращает DTO (`MatrixBoardDTO`, `CardDTO`), стор преобразует их в observable-сущности.
- **HOC для DnD** — `withSortable`, `withDraggable`, `withDroppable` инкапсулируют логику перетаскивания; конфигурация вынесена в `kanban-dnd-config.ts`.
- **Mock API** — данные хранятся в `localStorage` с имитацией задержки (заглушка для будущего бэкенда).

## Стек технологий

| Категория | Технология |
|-----------|------------|
| Фреймворк | React 19.2 |
| Язык | TypeScript 6.0 (strict) |
| Сборка | Vite 8.1 |
| Стейт-менеджмент | MobX 6.16 |
| Drag & Drop | `@dnd-kit/react` 0.5 |
| Стилизация | Tailwind CSS 4.3 |
| UI-примитивы | Radix UI (shadcn-паттерн) |
| Иконки | Lucide React |
| Линтер | ESLint 10 + Prettier 3.9 |

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (localhost:3000)
npm run dev

# Сборка продакшн-версии
npm run build

# Проверка кода (линтинг + форматирование)
npm run check
```

## Структура проекта

```
frontend/
├── src/
│   ├── app/                   # Корневой shell: App, layouts, providers
│   ├── pages/                 # Страницы: kanban-page
│   ├── widgets/               # Композитные виджеты
│   │   └── matrix/            # Матричная доска (board, card, cell, axes, menu)
│   ├── entities/              # Бизнес-сущности
│   │   └── matrix-panel/      # ★ Основной: Board, Card, Axis, MatrixBoardStore
│   ├── features/              # Фичи (в разработке)
│   ├── shared/                # Общая логика
│   │   ├── api/               # DTO, mock-клиент
│   │   ├── ui/                # atomic-компоненты (shadcn)
│   │   ├── hocs/              # HOC для drag-and-drop
│   │   ├── hooks/             # Кастомные хуки
│   │   └── lib/               # Утилиты, константы, localStorage
│   ├── main.tsx               # Точка входа
│   └── index.css              # Глобальные стили
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── package.json
```

## Текущий статус

Проект на стадии **MVP**. В активной разработке — матричный подход к Kanban-доскам. Архитектура и концепция могут меняться.
