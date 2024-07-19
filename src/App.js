import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import Sidebar from "./sidebar";
import Content from "./content";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Content />
        <Sidebar />
      </div>
    </DndProvider>
  );
}
