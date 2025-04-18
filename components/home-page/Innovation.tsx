"use client";

import React from "react";
import { FeatureCard } from "./FeatureCard";
import { AnimatedInnovationsCard } from "./AnimatedInnovationsCard";
import { FocusCardsDemo } from "./FocusCardSDemo";
import GradientText from "../GradientText";

const Innovation = () => {
  return (
    <>
      <div
        id="innovation"
        className="container mx-auto py-12 md:py-24 bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1]"
      >
        <div className="text-center space-y-20">
          <div>
            <GradientText
              colors={["#fb2c36", "#f59e0b", "#ea580c", "#b91c1c"]}
              animationSpeed={3}
              showBorder={false}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            >
              Innovation
            </GradientText>

            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-20">
              Unleashing Creativity through the Power of Innovation. Discover
              new tools, collaborate with fellow creators, and turn your ideas
              into reality.
            </p>

            <FeatureCard />
          </div>

          <div>
            <h3 className="mb-12 text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text">
              Mind Behind Ekiti Innovation
            </h3>

            <FocusCardsDemo />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl mb-12 font-extrabold tracking-tight bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text">
              Top Innovations
            </h3>

            <AnimatedInnovationsCard />
          </div>
        </div>
      </div>

      {/* AI Features */}
      {/* <div className="bg-gradient-to-r from-blue-100 to-yellow-100 py-12 md:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-green-600">
              AI-Powered Features
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our advanced AI capabilities make information retrieval and
              analysis intuitive and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="shadow-lg border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-red-500">
                    AI Voice Search
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Government officials and researchers can retrieve
                    information hands-free.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="shadow-lg border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-green-500">
                    Automatic Document Indexing
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    AI automatically indexes historical laws, regulations, and
                    government white papers.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="shadow-lg border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-blue-500">
                    Smart Summarization
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    AI auto-summarizes lengthy policy documents, making it easy
                    for decision-makers to extract key insights.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="shadow-lg border-2 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-yellow-500">
                    Personalized Content
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    AI suggests relevant materials based on user behavior and
                    preferences.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <AIChatbot />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Innovation;
