function parseCsvLine(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            cells.push(current);
            current = "";
        } else {
            current += char;
        }
    }

    cells.push(current);
    return cells;
}

export function parseCSV(csvText) {
    const rows = String(csvText || "").replace(/^\uFEFF/, "").split(/\r?\n/);
    if (!rows.length || !rows[0].trim()) return [];

    const headers = parseCsvLine(rows[0]).map((header) => header.trim());
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        if (!rows[i] || !rows[i].trim()) continue;
        const rowData = parseCsvLine(rows[i]);
        const rowObject = {};
        for (let j = 0; j < headers.length; j++) {
            const cell = rowData[j];
            rowObject[headers[j]] = cell == null ? "" : String(cell).trim();
        }
        data.push(rowObject);
    }

    return data;
}
