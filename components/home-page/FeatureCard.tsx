"use client";

import { FileText, Globe, Search, Server, Users } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "framer-motion";

export function FeatureCard() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <FeatureCardItem
        icon={<FileText className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Digital Document Conversion"
        description="Convert government research documents, policy papers, and historical archives into a searchable digital format."
      />

      <FeatureCardItem
        icon={<Users className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Accessible Resources"
        description="Enable students, startups, and government officials to access relevant materials."
      />

      <FeatureCardItem
        icon={<Globe className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Global Connection"
        description="Connect with Ekiti State research institutions, universities, and global digital libraries."
      />

      <FeatureCardItem
        icon={<Server className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="AI-powered Analysis"
        description="AI-powered trend analysis to highlight emerging innovations."
      />

      <FeatureCardItem
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Semantic Search"
        description="Users can type questions and get relevant AI-extracted answers from government research."
      />

      <FeatureCardItem
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Semantic Search"
        description="Users can type questions and get relevant AI-extracted answers from government research."
      />
    </ul>
  );
}

interface FeatureCardItemProps {
  area?: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const FeatureCardItem = ({
  area,
  icon,
  title,
  description,
}: FeatureCardItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-full border p-2 rounded-3xl md:p-3">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border border-gray-600 p-2 ">
                {icon}
              </div>
              <div className="space-y-3">
                <h3 className="pt-0.5 text-2xl font-semibold leading-none tracking-tight">
                  {title}
                </h3>
                <h2
                  className="[&_b]:md:font-semibold [&_strong]:md:font-semibold text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
                >
                  {description}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </li>
  );
};
