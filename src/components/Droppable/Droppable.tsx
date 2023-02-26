import { useDroppable } from "@dnd-kit/core";

import Card from "../Card";
import Draggable from "../Draggable";
import { type Item } from "../types";

export type DroppableItem = {
  title: string,
  items: Item[],
}

const Droppable = ({
  title,
  items,
}: DroppableItem) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <>
      <h2>{title}</h2>
      <div ref={setNodeRef}>
        {items.map(({ title: cardTitle }, key) => (
          <Draggable
            title={cardTitle}
            key={key}
            index={key}
            parent={title}
          >
            <Card 
              title={cardTitle} 
              text={key.toString()} 
            />
          </Draggable>
        ))}
      </div>
    </>
  )
};

export default Droppable;
