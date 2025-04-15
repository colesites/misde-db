"use client";

import React from "react";
import Orb from "../Orb";
import { Cursor } from "../motion-primitives/cursor";
import { motion } from "framer-motion";
import SplashCursor from "@/components/SplashCursor";

const Science = () => {
  return (
    <div
      id="science"
      className="container relative overflow-hidden mx-auto py-12 md:py-24 bg-gradient-to-b from-stone-50 to-orange-400"
    >
      <div className="text-center space-y-12">
        <div className="w-full h-[600px] relative">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
            Science
          </h2>
        </div>
      </div>
      <Cursor
        attachToParent
        variants={{
          initial: { scale: 0.3, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.3, opacity: 0 },
        }}
        springConfig={{
          bounce: 0.001,
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.15,
        }}
      >
        <motion.div
          animate={{
            width: 16,
            height: 16,
          }}
          className="flex items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40"
        ></motion.div>
      </Cursor>
      
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* <SplashCursor /> */}
      </div>
    </div>
  );
};

export default Science;
