import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutTemplate, Palette, Type } from "lucide-react";
import React from "react";
import LayoutChooser from "./tabs/LayoutChooser";
import { useSlideStore } from "@/store/useSlideStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { components } from "@/lib/constants";
import ComponentCard from "./tabs/components-tab/ComponentPreview";
import ThemeChooser from "./tabs/ThemeChooser";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EditorSidebar = () => {
  const { currentTheme } = useSlideStore();
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10">
      <div className="rounded-xl border-r-0 border border-background-70 shadow-lg p-2 flex flex-col items-center space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="size-10 rounded-full"
            >
              <LayoutTemplate className="size-5" />
              <span className="sr-only">Choose Layout</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" align="center" className="w-[480px] p-0">
            <LayoutChooser />
          </PopoverContent>
        </Popover>

        {/* // TODO: make drag and drop work */}
        <Popover>
          <PopoverTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="size-10 rounded-full"
                    disabled={true}
                  >
                    <Type className="size-5" />
                    <span className="sr-only"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Coming soon</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="w-[480px] p-0"
            style={{
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.fontColor,
            }}
          >
            <ScrollArea className="h-[400px]">
              <div className="p-4 flex flex-col space-y-6">
                {components.map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-start font-medium text-muted-foreground px-1">
                      {group.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {group.components.map((item) => (
                        <ComponentCard key={item.componentType} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="size-10 rounded-full"
            >
              <Palette className="size-5" />
              <span className="sr-only">Change Style</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" align="center" className="w-80">
            <ThemeChooser />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EditorSidebar;
