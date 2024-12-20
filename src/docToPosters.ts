import { GoogleSpreadsheet } from "google-spreadsheet";

import { Poster } from "@/types/Poster";

// GoogleSpreadsheetから情報を抜き出しArray<Poster>の形で返す
export async function docToPosters(doc: GoogleSpreadsheet): Promise<Array<Poster>> {
    const sheetName = "left"; // 使うシート名の指定
    const headers = ["title", "Text", "user", "timestamp"]; // シートのヘッダー名の指定

    const sheet = doc.sheetsByTitle[sheetName];
    const rows = await sheet.getRows();

    return rows.map((row) => ({
        title: row.get(headers[0]) as string,
        message: row.get(headers[1]) as string,
        author: row.get(headers[2]) as string,
        createAt: row.get(headers[3]) as string
    }));
}
