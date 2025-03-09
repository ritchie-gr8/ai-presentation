"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  onAddCard: () => void;
};

const AddCardButton = ({ onAddCard }: Props) => {
  const [showGap, setShowGap] = useState(false);
  return (
    <motion.div
      className="w-full relative overflow-hidden mt-7"
      initial={{ height: "1.5rem" }}
      animate={{
        height: showGap ? "2rem" : "1.5rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <div className="w-[40%] h-[1px] bg-primary" />
            <Button
              variant={"outline"}
              size={"sm"}
              className="rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary"
              onClick={onAddCard}
              aria-label="Add new card"
            >
              <Plus className="size-4 text-black" />
            </Button>
            <div className="w-[40%] h-[1px] bg-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
