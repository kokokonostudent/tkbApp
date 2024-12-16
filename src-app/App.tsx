import React, { createRoot } from "react-dom/client";

import { useIpcRenderer } from "@/hooks/useIpcRenderer";

function App() {
    const posters = useIpcRenderer();

    return (
        <>
            {posters?.map((p) => <p>{p.title}</p>)}
        </>
    );
}

const rootElem = document.getElementById("root");
if (rootElem !== null) {
    const root = createRoot(rootElem);
    root.render(<App />);
} else {
    console.log("rootエレメントが見つかりませんでした。");
}
