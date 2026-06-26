# Дневник проекта

--

## 25.06.2026

### Цель проекта

Хочу познакомиться Yjs и Tailwind, немного поработать с DnD


### Для начала план такой:

    - развернуть фронт (React+TS+Vite);
    - не сильно сложный канбан с DnD карточек и комментариями (TipTap? Lexical?);
    - подготовить формы авторизации и логина (JWT, валидация?);
    - подготовить простой бек (Express, имеющаяся заготовка на FastApi или все-таки Supabase?)
    - упаковать все в Docker Compose с Postgres (мб понадобится Redis?), если не Supabase;
    - добавить авторизацию на беке, добиться нормального коннекта фронта с беком
    - переходить к работе с Yjs Возможно синхрон положения карточек и редактирования комментариев.

### Backend

Проблема, что для Yjs понадобится бекенд. Между вариантами разворачиваться на Supabase или свой Express или FastApi, пока думаю выбрать Express, чтобы не вспоминать Python и пока не зависеть от хостера.

### Frontend

Хотел сразу писать в FSD, но пока решил отказаться в пользу сокращения лишней писанины.
Привычные CSS-модули отложил ради изучения популярного Tailwind.

### Проблемы и решения

1. Линтер ругается на index.css
   > Unknown at rule @custom-variant
   > Unknown at rule @theme
   > Unknown at rule @apply

Заглушил добавлением в .vscode/settings.json

```json
  "files.associations": {
    "*.css": "tailwindcss"
  }
```
2. Линтер ругается на экспорт чегото кроме компонента в добавленной из shadcn/ui кнопки
>Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.

на Github уже есть неразрешенные issue по этому поводу [7736] (https://github.com/shadcn-ui/ui/issues/7736) [8489] (https://github.com/shadcn-ui/ui/issues/8489)

пока просто заглушил правило в файле кнопки, потом посмотрим

### Сделано
- настроил окружение в frontend (vite, eslint, prettier) 
- инициализировал TailwindCSS и Shadcn/ui