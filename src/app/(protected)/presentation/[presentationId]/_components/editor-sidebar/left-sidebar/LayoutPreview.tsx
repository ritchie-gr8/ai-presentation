import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useState } from "react";
import DraggableSlidePreview from "./DraggableSlidePreview";

type Props = {};

const LayoutPreview = () => {
  const [loading, setLoading] = useState(true);
  const { getOrderedSlides, reorderSlides } = useSlideStore();
  const slides = getOrderedSlides();

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    reorderSlides(dragIndex, hoverIndex);
  };

  useEffect(() => {
    if (typeof window !== "undefined") setLoading(false);
  }, []);

  return (
    <div className="w-72 h-full fixed left-0 top-20 border-r overflow-y-auto">
      <ScrollArea className="h-full w-full" suppressHydrationWarning>
        {loading ? (
          <div className="w-full px-4 flex flex-col space-y-6">
            {[1, 2, 3].map((x) => (
              <Skeleton className="h-20 w-full" key={x} />
            ))}
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">
                SLIDES
              </h2>
              <span
                className="text-xs dark:text-gray-200 text-gray-400"
                suppressHydrationWarning
              >
                {slides.length} {slides.length > 1 ? "slides" : "slide"}
              </span>
            </div>
            {slides.map((slide, idx) => (
              <DraggableSlidePreview
                key={slide.id || idx}
                slide={slide}
                index={idx}
                moveSlide={moveSlide}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
