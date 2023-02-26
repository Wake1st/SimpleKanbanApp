import { useDroppable } from "@dnd-kit/core";

import Card from "../Card";
import Draggable from "../Draggable";
import { type Item } from "../types";

export type DroppableItem = {
  id: string,
  title: string,
  items: Item[],
}

const Droppable = ({
  id,
  title,
  items,
}: DroppableItem) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col justify-between h-full bg-sky-800 p-4 rounded-lg">
      <h2 className="basis-1/6 text-2xl font-medium tracking-wide text-slate-100 text-center p-2">{title}</h2>
      <div 
        className="basis-5/6 bg-sky-700 space-y-2 p-2 rounded-md" 
        ref={setNodeRef}
      >
        {items.map(({ title: cardTitle }, key) => (
          <Draggable
            title={cardTitle}
            key={key}
            index={key}
            parent={id}
          >
            <Card 
              title={cardTitle} 
              text={key.toString()} 
            />
          </Draggable>
        ))}
      </div>
    </div>
  )
};

export default Droppable;
