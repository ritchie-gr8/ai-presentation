import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ParagraphProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
}

const Paragraph = React.forwardRef<HTMLTextAreaElement, ParagraphProps>(
  ({ className, styles, isPreview = false, ...props }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
      const textArea = textAreaRef.current;

      if (textArea && !isPreview) {
        const adjustHeight = () => {
          textArea.style.height = "0";
          textArea.style.height = `${textArea.scrollHeight}px`;
        };

        textArea.addEventListener("input", adjustHeight);
        adjustHeight();
        return () => textArea.removeEventListener("input", adjustHeight);
      }
    }, [isPreview]);

    return (
      <textarea
        className={cn(
          `w-full bg-transparent font-normal text-gray-900 placeholder:text-gray-300 mx-2
                focus:outline-none resize-none overflow-hidden leading-tight focus:bg-primary-90`,
          `${isPreview ? "text-[0.5rem]" : "text-lg"}`,
          className
        )}
        style={{
          color: "inherit",
          boxSizing: "content-box",
          lineHeight: "1.5em",
          minHeight: "1.5em",
          ...styles,
        }}
        ref={(element) => {
          (textAreaRef.current as HTMLTextAreaElement | null) = element;

          if (typeof ref === "function") ref(element);
          else if (ref) ref.current = element;
        }}
        readOnly={isPreview}
        {...props}
      />
    );
  }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
