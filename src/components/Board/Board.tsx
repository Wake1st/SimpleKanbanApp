import { useState } from "react";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { type DragEndEvent } from "@dnd-kit/core";

import Droppable from "../Droppable";
import AddItem from "./AddItem";
import { type Item } from "../types";


const Board = () => {
  const [todoItems, setToDoItems] = useState<Item[]>([]);
  const [doneItems, setDoneItems] = useState<Item[]>([]);
  const [inProgressItems, setInProgressItems] = useState<Item[]>([]);

  const addNewItem = (title: string) => {
    setToDoItems([...todoItems, { title }]);
  }

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e: DragEndEvent) => {
        const container = e.over?.id;
        const title = e.active.data.current?.title as string ?? "";
        const index = e.active.data.current?.index as number ?? 0;
        const parent = e.active.data.current?.parent as string ?? "ToDo";
        const item = { title };

        switch (container) {
          case "Done":
            setDoneItems([...doneItems, item]);
            break;
          case "InProgress":
            setInProgressItems([...inProgressItems, item]);
            break;
          case "ToDo":
          default:
            setToDoItems([...todoItems, item]);
        }

        switch (parent) {
          case "Done":
            setDoneItems([
              ...doneItems.slice(0, index), 
              ...doneItems.slice(index + 1),
            ]);
            break;
          case "InProgress":
            setInProgressItems([
              ...inProgressItems.slice(0, index), 
              ...inProgressItems.slice(index + 1),
            ]);
            break;
          case "ToDo":
          default:
            setToDoItems([
              ...todoItems.slice(0, index), 
              ...todoItems.slice(index + 1), 
            ]);
        }
      }}
    >
      <div className="flex">
        <AddItem addItem={addNewItem} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Droppable title="ToDo" items={todoItems} />
          <Droppable title="In Progress" items={inProgressItems} />
          <Droppable title="Done" items={doneItems} />
        </div>
      </div>
      
    </DndContext>
  )
}

export default Board;
