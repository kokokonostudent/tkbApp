import { app, ipcMain, BrowserWindow } from "electron";
import path from "path";

import { Poster } from "@/types/Poster";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile("index.html");
    //win.webContents.openDevTools();
};

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

ipcMain.handle("get_posters", async () => {
    const posters: Array<Poster> = [
        { title: "test1", author: "test author", message: "test1 message" },
        { title: "test2", author: "test author", message: "test2 message" },
        { title: "test3", author: "test author", message: "test3 message" },
        { title: "test4", author: "test author", message: "test4 message" },
        { title: "test5", author: "test author", message: "test5 message" },
    ];

    return posters;
});
