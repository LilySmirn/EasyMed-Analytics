// dbload/loadDoctors.mjs
import XLSX from "xlsx";

/**
 * Загружает уникальных врачей из Excel и записывает в таблицу doctors
 * @param {import('mysql2/promise').Connection} conn
 * @param {string} filePath
 */
export async function loadDoctors(conn, filePath) {
    console.log("Загрузка врачей из файла:", filePath);

    const wb = XLSX.readFile(filePath);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log("Прочитано строк:", rows.length);

    // создаём уникальные пары врач + специальность
    const doctorsMap = new Map();
    for (const row of rows) {
        const doctorExternalId = row["ID врача"];
        const specialityExternalId = row["ID специальности"];
        if (doctorExternalId && specialityExternalId) {
            const key = `${doctorExternalId}||${specialityExternalId}`;
            if (!doctorsMap.has(key)) {
                doctorsMap.set(key, { doctorExternalId, specialityExternalId });
            }
        }
    }

    console.log("Уникальных врачей:", doctorsMap.size);

    for (const { doctorExternalId, specialityExternalId } of doctorsMap.values()) {
        // находим id специальности в таблице specialities
        const [rowsSpec] = await conn.execute(
            `SELECT id FROM specialities WHERE external_id = ?`,
            [specialityExternalId]
        );
        if (rowsSpec.length === 0) continue;

        const specialityId = rowsSpec[0].id;

        await conn.execute(
            `INSERT INTO doctors (full_name, speciality_id, external_id)
             VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                                      full_name = VALUES(full_name),
                                      speciality_id = VALUES(speciality_id)`,
            [
                doctorExternalId, // временно используем ID врача как full_name
                specialityId,
                doctorExternalId
            ]
        );
    }

    console.log("Врачи записаны или обновлены:", doctorsMap.size);
}
