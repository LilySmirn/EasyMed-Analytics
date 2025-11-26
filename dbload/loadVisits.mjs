import XLSX from "xlsx";
import mysql from "mysql2/promise";

export async function loadVisits(conn, filePath) {
    console.log("Загрузка визитов из файла:", filePath);

    // читаем Excel
    const wb = XLSX.readFile(filePath);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log("Прочитано строк:", rows.length);

    let inserted = 0;
    let skipped = 0;

    for (const row of rows) {
        const visitExternalId = row["Идентификатор посещения"];
        const patientId = row["Идентификатор пациента"];
        const doctorExternalId = row["ID врача"];
        const serviceExternalId = row["ID услуги"];
        const visitDate = row["Дата посещения"];

        if (!visitExternalId || !patientId || !doctorExternalId || !serviceExternalId)
            continue;

        // тип визита
        const serviceName = row["Наименование услуги"]?.toLowerCase() || "";

        let visitType = "none";
        if (serviceName.includes("первич")) visitType = "primary";
        else if (serviceName.includes("повтор")) visitType = "repeat";

        // doctor_id по external_id
        const [doctorRows] = await conn.execute(
            `SELECT id FROM doctors WHERE external_id = ?`,
            [doctorExternalId]
        );

        if (doctorRows.length === 0) {
            console.warn("Доктор не найден:", doctorExternalId);
            continue;
        }

        const doctorId = doctorRows[0].id;

        // service_id
        const [serviceRows] = await conn.execute(
            `SELECT id FROM service_catalog WHERE external_id = ?`,
            [serviceExternalId]
        );

        if (serviceRows.length === 0) {
            console.warn("Услуга не найдена:", serviceExternalId);
            continue;
        }

        const serviceId = serviceRows[0].id;

        // визит
        try {
            await conn.execute(
                `
                INSERT INTO visits 
                    (external_id, patient_id, doctor_id, service_id, visit_type, visit_date)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    visit_type = VALUES(visit_type),
                    visit_date = VALUES(visit_date)
                `,
                [
                    visitExternalId,
                    patientId,
                    doctorId,
                    serviceId,
                    visitType,
                    visitDate.split(" ")[0],
                ]
            );

            inserted++;
        } catch (e) {
            skipped++;
        }
    }

    console.log(`Визитов записано: ${inserted}, пропущено: ${skipped}`);
}
