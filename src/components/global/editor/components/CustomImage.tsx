import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable?: boolean;
};

const CustomImage = ({
  src,
  alt,
  className,
  isPreview = false,
  isEditable = true,
  contentId,
  onContentChange,
}: Props) => {
  return (
    <div className={`relative group w-full h-full rounded-lg`}>
      <Image
        src={src}
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
        alt={alt}
        className={`object-cover w-full h-full rounded-lg ${className}`}
      />
      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover:block"></div>
      )}
    </div>
  );
};

export default CustomImage;
