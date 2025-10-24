// generate-components-doc.js
const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.join("src", "components");
const DOCS_FILE = path.join("docs", "components.md");

const TREMOR_COMPONENTS = [
    "Button.tsx",
    "Card.tsx",
    "Drawer.tsx",
    "ProgressBar.tsx",
    "Select.tsx",
    "Sidebar.tsx",
    "Table.tsx",
    "Tooltip.tsx",
    "FilterSelect.tsx",
];

const HEADER = `# 🧩 Компоненты проекта

Этот файл частично сгенерирован автоматически (см. \`generate-components-doc.js\`).

В проекте используются компоненты из папки \`src/components/\`.
Некоторые из них построены на базе **Tremor UI**, остальные — кастомные React-компоненты,
стилизованные с помощью **TailwindCSS**.

---

`;

function ensureDocsFile() {
    if (!fs.existsSync(DOCS_FILE)) {
        fs.mkdirSync(path.dirname(DOCS_FILE), { recursive: true });
        fs.writeFileSync(DOCS_FILE, HEADER, "utf8");
        console.log("📄 Создан новый docs/components.md");
    }
}

function readDocs() {
    return fs.readFileSync(DOCS_FILE, "utf8");
}

function getExistingComponentNames(content) {
    const regex = /###\s+(\S+\.tsx)/g;
    const names = new Set();
    let match;
    while ((match = regex.exec(content))) {
        names.add(match[1].trim());
    }
    return names;
}

function appendNewComponents() {
    ensureDocsFile();

    const existingContent = readDocs();
    const existingNames = getExistingComponentNames(existingContent);

    const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith(".tsx"));
    const newComponents = files.filter(f => !existingNames.has(f));

    if (newComponents.length === 0) {
        console.log("✅ Новых компонентов не найдено, ничего не добавлено.");
        return;
    }

    let additions = "\n";
    for (const file of newComponents.sort()) {
        const name = file.replace(".tsx", "");
        const isTremor = TREMOR_COMPONENTS.includes(file);
        const desc = isTremor
            ? `Основан на **Tremor ${name}** и дополнительно стилизован с помощью **TailwindCSS**.`
            : `Кастомный React-компонент, стилизованный с помощью **TailwindCSS**.`;

        additions += `### **${file}**\n${desc}\n\n---\n\n`;
        console.log(`➕ Добавлен новый компонент: ${file}`);
    }

    fs.appendFileSync(DOCS_FILE, additions, "utf8");
    console.log(`✅ Добавлены ${newComponents.length} новых компонент(ов) в docs/components.md`);
}

appendNewComponents();
