"use client";

import type React from "react";

import { Lightbulb, Rocket, Users, Zap, Cpu, Globe } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "framer-motion";

export function FeatureCard() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCardItem
        icon={<Lightbulb className="h-6 w-6 text-red-500" />}
        title="Innovation Hub"
        description="State-of-the-art innovation hub providing workspace, tools, and resources for innovators and entrepreneurs."
      />

      <FeatureCardItem
        icon={<Rocket className="h-6 w-6 text-green-500" />}
        title="Startup Incubation"
        description="Comprehensive incubation program supporting early-stage startups with mentorship, funding, and market access."
      />

      <FeatureCardItem
        icon={<Users className="h-6 w-6 text-blue-500" />}
        title="Innovation Community"
        description="Vibrant community of innovators, entrepreneurs, and industry experts collaborating to solve local challenges."
      />

      <FeatureCardItem
        icon={<Zap className="h-6 w-6 text-yellow-500" />}
        title="Innovation Challenges"
        description="Regular innovation competitions addressing specific sectors like agriculture, health, and education."
      />

      <FeatureCardItem
        icon={<Cpu className="h-6 w-6 text-red-500" />}
        title="Tech Skills Development"
        description="Comprehensive training programs equipping youth with in-demand technology and innovation skills."
      />

      <FeatureCardItem
        icon={<Globe className="h-6 w-6 text-green-500" />}
        title="Global Innovation Network"
        description="Connections with international innovation ecosystems providing global exposure and partnership opportunities."
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
              <div className="w-fit rounded-lg p-3 bg-gray-100">{icon}</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-blue-800">
                  {title}
                </h3>
                <h2 className="text-lg text-gray-700">{description}</h2>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </li>
  );
};
