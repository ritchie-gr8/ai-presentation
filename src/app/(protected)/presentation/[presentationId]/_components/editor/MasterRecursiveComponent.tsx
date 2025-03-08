"use client";

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/components/Headings";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import DropZone from "./DropZone";
import Paragraph from "@/components/global/editor/components/Paragraph";
import TableComponent from "@/components/global/editor/components/TableComponent";
import ColumnComponent from "../../../../../../components/global/editor/components/ColumnComponent";
import CustomImage from "@/components/global/editor/components/CustomImage";

type MasterRecursiveComponentProps = {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
};

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, index, isPreview, isEditable }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    // TODO: finish all types
    console.log(content.type);
    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading1 {...commonProps} />
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading2 {...commonProps} />
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading3 {...commonProps} />
          </motion.div>
        );
      case "heading4":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading4 {...commonProps} />
          </motion.div>
        );
      case "title":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Title {...commonProps} />
          </motion.div>
        );
      case "paragraph":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Paragraph {...commonProps} />
          </motion.div>
        );
      case "table":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <TableComponent
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChange(
                  content.id,
                  newContent !== null ? newContent : ""
                )
              }
              initialRowSize={content.initialRows}
              initialColSize={content.initialColumns}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "resizable-column":
        console.log("resize before if", content);
        if (Array.isArray(content.content)) {
          console.log("resize after if", content);
          return (
            <motion.div className="w-full h-full" {...animationProps}>
              <ColumnComponent
                content={content.content as ContentItem[]}
                className={content.className}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            </motion.div>
          );
        }
        return null;

      case "image":
        console.log("image", content);
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <CustomImage
              src={content.content as string}
              alt={content.alt || "image"}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn("w-full h-full flex flex-col")}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIdx: number) => (
                    <React.Fragment key={subItem.id || `item-${subIdx}`}>
                      {!isPreview &&
                        !subItem.restrictToDrop &&
                        subIdx === 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
                            parentId={content.id}
                            slideId={slideId}
                          />
                        )}
                      <MasterRecursiveComponent
                        content={subItem}
                        onContentChange={onContentChange}
                        isPreview={isPreview}
                        slideId={slideId}
                        index={subIdx}
                        isEditable={isEditable}
                      />
                      {!isPreview && !subItem.restrictToDrop && isEditable && (
                        <DropZone
                          index={subIdx + 1}
                          parentId={content.id}
                          slideId={slideId}
                        />
                      )}
                    </React.Fragment>
                  )
                )
              ) : isEditable ? (
                <DropZone index={0} parentId={content.id} slideId={slideId} />
              ) : null}
            </motion.div>
          );
        }

        return null;
      default:
        return null;
    }
  }
);

ContentRenderer.displayName = "ContentRenderer";

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      onContentChange,
      slideId,
      index,
      isEditable = true,
      isPreview = false,
    }) => {
      if (isPreview) {
        return (
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        );
      }

      return (
        <React.Fragment>
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        </React.Fragment>
      );
    }
  );

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
