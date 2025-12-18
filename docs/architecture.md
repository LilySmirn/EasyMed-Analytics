# Архитектура проекта EasyMed Analytics

В этом документе описана структура проекта, назначение основных папок и файлов, а также краткое пояснение к ключевым компонентам.

---

## 📂 Основные папки проекта

### `src/app/` — страницы и маршруты API
- Содержит Next.js страницы и маршруты API.
- Структура:
    - `api/` — серверные маршруты API
        - `appointments/route.ts` — получение списка записей, создание и работа с отдельными appointments
        - `appointments/[id]/route.ts` — работа с конкретной записью по id
        - `doctors/route.ts` — маршруты для работы с врачами
        - `nosologies/route.ts` - получение списка нозологий
        - `nosologies/[id]/doctors/route.ts` - получение списка врачей, работающих с выбранной нозологией
        - `statistics/route.ts` - получение причин отмены
        - `specialities/route.ts` - получение списка специальностей
    - `appointments/` — страницы для отображения записей
        - `AppointmentsPageInner.tsx` — внутренний компонент страницы appointments
        - `page.tsx` — основной компонент страницы
        - `[id]/page.tsx` — страница конкретной записи
    - `doctors/page.tsx` — страница со списком врачей
    - `statistics/page.tsx` — страницы для отображения причин отмены
    - `nosologies/` — страницы для отображения нозологий
      - `nosologies/page.tsx` — страницы для отображения общего списка нозологий
      - `nosologies/[id]/page.tsx` — страницы для отображения выбранной нозологии
    - `layout.tsx` — общий layout приложения
    - `globals.css` — глобальные стили
    - `fonts/` — шрифты проекта
    - `favicon.ico` — иконка сайта
    - `page.tsx` — главная страница сайта

### `src/components/` — UI-компоненты
- Переиспользуемые компоненты интерфейса.
- Примеры:
    - `Button.tsx` — кнопка
    - `Card.tsx`, `MetricCard.tsx` — карточки для отображения данных
    - `Drawer.tsx` — боковое меню
    - `AppointmentsTable.tsx`, `DoctorsTable.tsx` — таблицы данных
    - `FilterSelect.tsx`, `Select.tsx` — селекты и фильтры
    - `Sidebar.tsx` — боковая панель
    - `Tooltip.tsx`, `ProgressBar.tsx` — вспомогательные визуальные компоненты
    - `TopFilters.tsx`, `TopFiltersClient.tsx` — фильтры для дашборда

### `src/context/` — React Context и глобальные состояния
- `FiltersContext.tsx` — глобальный контекст для фильтров и управления состоянием таблиц/списков

### `src/lib/` — вспомогательные библиотеки и функции
- `chartUtils.ts` — функции для построения графиков
- `utils.ts` — вспомогательные функции общего назначения

### `src/utils/` — отдельные утилиты
- `applyFilters.ts` — функции для применения фильтров к данным

### `public/` — статические файлы
- Изображения, иконки, шрифты и другие статические ресурсы.

---

## ⚙️ Конфигурационные файлы

- `package.json` / `package-lock.json` — зависимости проекта и скрипты
- `tsconfig.json` — TypeScript конфигурация
- `next.config.mjs` — конфигурация Next.js
- `tailwind.config.ts` / `postcss.config.mjs` — конфигурация TailwindCSS и PostCSS
- `.eslintrc.json` — правила ESLint
- `.gitignore` — файлы и папки, исключённые из git
- `.vercel/` — настройки проекта для деплоя на Vercel
- `.github/workflows/update-structure.yml` — CI workflow для автоматической генерации структуры и документации

---

## 📝 Общая структура
Сокращённая структура проекта показана ниже:
```text
src/
├── app/
│   ├── api/
│   │   ├── appointments/
│   │   ├── nosologies/
│   │   ├── statistics/
│   │   ├── specialities/
│   │   └── doctors/
│   ├── appointments/
│   ├── doctors/
│   ├── nosologies/
│   ├── statistics/
│   ├── specialities/
│   ├── fonts/
│   ├── layout.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
├── context/
├── lib/
└── utils/
public/
docs/
```

Полное дерево файлов доступно в [docs/structure.md](./structure.md).
