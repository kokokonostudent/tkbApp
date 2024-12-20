import path from "path";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { app, ipcMain, BrowserWindow } from "electron";

import { createAccountAuth } from "@/src/createAccountAuth";
import { docToPosters } from "@/src/docToPosters";
import { loadDotEnv } from "@/src/loadDotEnv";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile("index.html");
    // win.webContents.openDevTools();
};

app.whenReady().then(() => {
    // .envファイル読み込み
    loadDotEnv();

    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// "get_posters"を受信したときの処理
// SpreadSheetから情報を読み取り、Array<Poster>に整形して返す
ipcMain.handle("get_posters", async () => {
    /* テスト用データ
    const posters: Array<Poster> = [
        { title: "test1", author: "test author", message: "test1 message" },
        { title: "test2", author: "test author", message: "test2 message" },
        { title: "test3", author: "test author", message: "test3 message" },
        { title: "test4", author: "test author", message: "test4 message" },
        { title: "test5", author: "test author", message: "test5 message" },
    ];
    */

    // ログイン・ダウンロード処理
    const auth = createAccountAuth();
    const doc = new GoogleSpreadsheet("" /* ← sheetIDに書き換え */, auth);
    await doc.loadInfo();

    // データ整形
    const posters = await docToPosters(doc);

    return posters;
});
