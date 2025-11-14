# Полная структура проекта

Этот файл сгенерирован автоматически (см. `generate-structure.js`).

Ниже приведено дерево всех файлов и папок проекта:
```text
.
├── .eslintrc.json
├── .github/
│   └── workflows/
│       └── update-structure.yml
├── .gitignore
├── .vercelignore
├── docs/
│   ├── api.md
│   ├── architecture.md
│   ├── components.md
│   ├── context.md
│   ├── lib.md
│   ├── README.md
│   ├── setup.md
│   ├── structure.md
│   └── utils.md
├── generate-components-doc.js
├── generate-structure.js
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
├── README.md
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── appointments/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── appointments/
│   │   │   │   └── route.ts
│   │   │   ├── nosologies/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── doctors/
│   │   │   │   │       └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── doctors/
│   │   │       └── route.ts
│   │   ├── appointments/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── AppointmentsPageInner.tsx
│   │   │   └── page.tsx
│   │   ├── doctors/
│   │   │   └── page.tsx
│   │   ├── nosologies/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── cancel-reasons/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── fonts/
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AppointmentDetailsTable.tsx
│   │   ├── AppointmentsTable.tsx
│   │   ├── BackButton.tsx
│   │   ├── Button.tsx
│   │   ├── Calendar.tsx
│   │   ├── CalendarFilter.tsx
│   │   ├── Card.tsx
│   │   ├── CardDemo.tsx
│   │   ├── demoComponent.tsx
│   │   ├── DoctorsTable.tsx
│   │   ├── Drawer.tsx
│   │   ├── FilterSelect.tsx
│   │   ├── NosologiesTable.tsx
│   │   ├── NosologyDoctorsTable.tsx
│   │   ├── Popover.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Select.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SatisticsTable.tsx
│   │   ├── Table.tsx
│   │   ├── Tooltip.tsx
│   │   ├── TopFilters.tsx
│   │   └── TopFiltersClient.tsx
│   ├── context/
│   │   └── FiltersContext.tsx
│   ├── lib/
│   │   ├── chartUtils.ts
│   │   └── utils.ts
│   └── utils/
│       └── applyFilters.ts
├── structure.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel-build.json

```
