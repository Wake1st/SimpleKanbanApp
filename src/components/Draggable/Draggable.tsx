import { type PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export type DraggableItem = PropsWithChildren<{
  title: string,
  index: number,
  parent: string,
}>;

const Draggable = ({ 
  title, 
  index, 
  parent,
  children,
}: DraggableItem) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={style.transform}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default Draggable;
