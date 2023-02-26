import { type PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export type DraggableItem = {
  title: string,
  index: number,
  parent: string,
};

type DraggableProps = PropsWithChildren<DraggableItem>;

const Draggable = ({ 
  title, 
  index, 
  parent,
  children,
}: DraggableProps) => {
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
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default Draggable;
