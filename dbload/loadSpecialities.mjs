// dbload/loadSpecialities.mjs
import XLSX from "xlsx";

/**
 * Загружает уникальные специальности из Excel и записывает в таблицу specialities
 * @param {import('mysql2/promise').Connection} conn - подключение к MySQL
 * @param {string} filePath - путь к Excel файлу
 */
export async function loadSpecialities(conn, filePath) {
    console.log("Загрузка специальностей из файла:", filePath);

    const wb = XLSX.readFile(filePath);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log("Прочитано строк:", rows.length);

    // уникальные пары (ID специальности, Название)
    const specialtiesMap = new Map();
    for (const row of rows) {
        const externalId = row["ID специальности"];
        const name = row["Название специальности"]?.trim();
        if (externalId && name && !specialtiesMap.has(externalId)) {
            specialtiesMap.set(externalId, name);
        }
    }

    console.log("Уникальных специальностей:", specialtiesMap.size);

    // запись в таблицу specialities
    for (const [externalId, name] of specialtiesMap) {
        await conn.execute(
            `INSERT INTO specialities (external_id, name) VALUES (?, ?)`,
            [externalId, name]
        );
    }

    console.log("Записано специальностей:", specialtiesMap.size);
}
