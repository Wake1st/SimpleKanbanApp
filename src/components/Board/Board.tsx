import { useState } from "react";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { type DragEndEvent } from "@dnd-kit/core";

import Droppable from "../Droppable";
import AddItem from "./AddItem";
import { type Item } from "../types";
import { type DraggableItem } from "../Draggable";

export const AREAS = {
  TODO: 'todo',
  INPROGRESS: 'inprogress',
  DONE: 'done',
};

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

        if (!e.active.data.current) {
          return; 
        }

        const { 
          title, 
          index, 
          parent 
        } = (e.active.data.current ?? { 
          title: "", 
          index: 0, 
          parent: AREAS.TODO
        }) as DraggableItem;

        // const title = e.active.data.current?.title as string ?? "";
        // const index = e.active.data.current?.index as number ?? 0;
        // const parent = e.active.data.current?.parent as string ?? AREAS.TODO;
        const item = { title };
        
        if (parent === container) {
          return; //  item has not moved
        }

        switch (parent) {
          case AREAS.TODO:
            setToDoItems([
              ...todoItems.slice(0, index), 
              ...todoItems.slice(index + 1), 
            ]);
            break;
          case AREAS.INPROGRESS:
            setInProgressItems([
              ...inProgressItems.slice(0, index), 
              ...inProgressItems.slice(index + 1),
            ]);
            break;
          case AREAS.DONE:
            setDoneItems([
              ...doneItems.slice(0, index), 
              ...doneItems.slice(index + 1),
            ]);
        }

        switch (container) {
          case AREAS.TODO:
            setToDoItems([...todoItems, item]);
            break;
          case AREAS.INPROGRESS:
            setInProgressItems([...inProgressItems, item]);
            break;
          case AREAS.DONE:
            setDoneItems([...doneItems, item]);
        }
      }}
    >
      <div className="w-full flex flex-col bg-sky-900 p-4 space-y-4 rounded-xl">
        <AddItem addItem={addNewItem} />
        <div className="h-96 columns-3 gap-4">
          <Droppable id={AREAS.TODO} title="ToDo" items={todoItems} />
          <Droppable id={AREAS.INPROGRESS} title="In Progress" items={inProgressItems} />
          <Droppable id={AREAS.DONE} title="Done" items={doneItems} />
        </div>
      </div>
    </DndContext>
  )
}

export default Board;
