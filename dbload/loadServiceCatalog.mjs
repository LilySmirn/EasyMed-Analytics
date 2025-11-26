import XLSX from "xlsx";
import path from "path";

/**
 * Загружает уникальные услуги из Excel и записывает в таблицу service_catalog
 * @param {import('mysql2/promise').Connection} conn - соединение с базой
 * @param {string} dataDir - путь к папке с Excel файлами
 */
export async function loadServiceCatalog(conn, dataDir) {
    const PROVIDED_FILE = path.join(dataDir, "provided.xlsx");
    const PRESCRIBED_FILE = path.join(dataDir, "prescribed.xlsx");

    console.log("Загрузка услуг из файлов:", PROVIDED_FILE, PRESCRIBED_FILE);

    const files = [PROVIDED_FILE, PRESCRIBED_FILE];
    const servicesMap = new Map();

    for (const filePath of files) {
        console.log("Читаю:", filePath);

        const wb = XLSX.readFile(filePath);
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        console.log(`Прочитано строк: ${rows.length}`);

        for (const row of rows) {
            const externalId = row["ID услуги"];
            if (!externalId) continue;

            const name = row["Наименование услуги"] != null ? String(row["Наименование услуги"]).trim() : null;
            const serviceCode = row["Код услуги"] != null ? String(row["Код услуги"]).trim() : null;
            const clinicName = row["Клиника"]?.trim() || "Клиника";
            const price = 0; // пока что цена неизвестна, ставим 0

            if (!servicesMap.has(externalId)) {
                servicesMap.set(externalId, {
                    name,
                    price,
                    serviceCode,
                    clinicName
                });
            }
        }
    }

    console.log("Уникальных услуг:", servicesMap.size);

    // запись в БД с UPSERT
    for (const [externalId, svc] of servicesMap.entries()) {
        await conn.execute(
            `
                INSERT INTO service_catalog
                    (external_id, name, price, service_code, clinic_name)
                VALUES (?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                                         name = VALUES(name),
                                         price = VALUES(price),
                                         service_code = VALUES(service_code),
                                         clinic_name = VALUES(clinic_name)
            `,
            [externalId, svc.name, svc.price, svc.serviceCode, svc.clinicName]
        );
    }

    console.log("Услуги записаны или обновлены:", servicesMap.size);
}
