import { useEffect, useState } from "react";
import { Poster } from "@/types/Poster";

interface ElectronWindow extends Window {
    commands: {
        getPosters: () => Promise<Array<Poster>>;
    };
}

declare const window: ElectronWindow;

export function useIpcRenderer() {
    const [data, setData] = useState<Array<Poster> | undefined>(undefined);

    useEffect(() => {
        window.commands.getPosters().then((posters) => {
            setData(posters);
        });
    }, []);

    return data;
}
