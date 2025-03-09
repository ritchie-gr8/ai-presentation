import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { useDrag } from "react-dnd";

type ComponentItemProps = {
  type: string;
  componentType: string;
  name: string;
  component: ContentItem;
  icon: string;
};

const ComponentCard = ({ item }: { item: ComponentItemProps }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CONTENT_ITEM",
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className={cn("border", isDragging ? "opacity-50" : "opacity-100")}
    >
      <button
        className={cn(
          "flex flex-col items-center cursor-grab active:cursor-grabbing",
          "gap-2 p-2 rounded-lg hover:bg-primary-10",
          "transition-all duration-200 text-center w-full",
          "hover:scale-105 transform"
        )}
      >
        <div
          className="w-full aspect-[16/9] rounded-md border bg-gray-100 dark:bg-gray-500
                p-2 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center flex-col"
        >
          <div>
            <span className="text-2xl text-primary-foreground">
              {item.icon}
            </span>
          </div>
          <span className="text-xs text-gray-300 font-medium">{item.name}</span>
        </div>
      </button>
    </div>
  );
};

export default ComponentCard;
