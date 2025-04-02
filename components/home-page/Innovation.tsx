"use client";

import React from "react";
import { FeatureCard } from "./FeatureCard";
import { AnimatedInnovationsCard } from "./AnimatedInnovationsCard";
import { FocusCardsDemo } from "./FocusCardSDemo";

const Innovation = () => {
  return (
    <>
      <div id="innovation" className="container mx-auto py-12 md:py-24">
        <div className="text-center space-y-12">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500">
              Innovation
            </h2>

            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Unleashing Creativity through the Power of Innovation. Discover
              new tools, collaborate with fellow creators, and turn your ideas
              into reality
            </p>
          </div>

          <div>
            <h3 className="mb-12 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text">
              Mind Behind Ekiti Innovation
            </h3>

            <FocusCardsDemo />
          </div>
          <h3 className="text-3xl mt-22 font-extrabold tracking-tight bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text">
            Top Innovations
          </h3>
          
          <AnimatedInnovationsCard />
          <div>

          </div>
        </div>
        {/* <FeatureCard /> */}
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
