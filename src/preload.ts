import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("commands", {
    getPosters: () => ipcRenderer.invoke("get_posters"),
});
