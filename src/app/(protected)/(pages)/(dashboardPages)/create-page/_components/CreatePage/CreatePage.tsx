"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  containeVariants,
  createPageCard,
  itemVariants,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import RecentPrompts from "../GenerateAI/RecentPrompts";
import usePromptStore from "@/store/usePromptStore";

type Props = {
  onSelectOptions: (option: string) => void;
};

const CreatePage = ({ onSelectOptions }: Props) => {
  const { prompts } = usePromptStore();

  return (
    <motion.div
      variants={containeVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          How would you like to get started?
        </h1>
        <p className="text-secondary">Choose your preferred method to begin</p>
      </motion.div>
      <motion.div
        variants={containeVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        {createPageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={`${
              option.highlight
                ? "bg-vivid-gradient"
                : "hover:bg-vivid-gradient border"
            }
            rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
          >
            <motion.div
              className="'w-full h-full p-4 flex flex-col gap-y-6 items-start justify-between bg-white dark:bg-black rounded-xl"
              whileHover={{
                transition: { duration: 0.1 },
              }}
            >
              <div className="flex flex-col items-start w-full gap-y-3">
                <div>
                  <p className="text-primary text-lg font-semibold">
                    {option.title}
                  </p>
                  <p
                    className={`${
                      option.highlight ? "text-vivid" : "text-primary"
                    } text-4xl font-bold`}
                  >
                    {option.highlightedText}
                  </p>
                </div>
                <p className="text-secondary text-sm font-normal">
                  {option.description}
                </p>
              </div>
              <motion.div
                className="self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={option.highlight ? "default" : "outline"}
                  className="w-fit rounded-xl font-bold"
                  size={"sm"}
                  onClick={() => onSelectOptions(option.type)}
                >
                  {option.highlight ? "Generate" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreatePage;
