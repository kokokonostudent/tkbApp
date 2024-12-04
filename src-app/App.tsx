import React, { createRoot } from "react-dom/client";

function App() {
    return <h1>hello from REACT</h1>;
}

const rootElem = document.getElementById("root");
if (rootElem !== null) {
    const root = createRoot(rootElem);
    root.render(<App />);
} else {
    console.log("rootエレメントが見つかりませんでした。");
}
