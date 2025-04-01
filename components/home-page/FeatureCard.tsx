"use client";

import { FileText, Globe, Search, Server, Users } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "framer-motion";

export function FeatureCard() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCardItem
        icon={<FileText className="h-6 w-6 text-red-500" />}
        title="Digital Document Conversion"
        description="Convert government research documents, policy papers, and historical archives into a searchable digital format."
      />

      <FeatureCardItem
        icon={<Users className="h-6 w-6 text-green-500" />}
        title="Accessible Resources"
        description="Enable students, startups, and government officials to access relevant materials."
      />

      <FeatureCardItem
        icon={<Globe className="h-6 w-6 text-blue-500" />}
        title="Global Connection"
        description="Connect with Ekiti State research institutions, universities, and global digital libraries."
      />

      <FeatureCardItem
        icon={<Server className="h-6 w-6 text-yellow-500" />}
        title="AI-powered Analysis"
        description="AI-powered trend analysis to highlight emerging innovations."
      />

      <FeatureCardItem
        icon={<Search className="h-6 w-6 text-red-500" />}
        title="Semantic Search"
        description="Users can type questions and get relevant AI-extracted answers from government research."
      />

      <FeatureCardItem
        icon={<Search className="h-6 w-6 text-green-500" />}
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
    <li className={`min-h-[16rem] list-none ${area}`}>
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative h-full border p-4 rounded-3xl md:p-6 bg-white shadow-xl">
          <GlowingEffect
            spread={50}
            glow={true}
            disabled={false}
            proximity={70}
            inactiveZone={0.01}
          />
          <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl border-0.75 p-8 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
            <div className="relative flex flex-1 flex-col justify-between gap-4">
              <div className="w-fit rounded-lg p-3 bg-gray-100">
                {icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-blue-800">
                  {title}
                </h3>
                <h2 className="text-lg text-gray-700">
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