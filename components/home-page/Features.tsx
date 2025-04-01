import { FeatureCard } from "@/components/home-page/FeatureCard";
import React from "react";
import AIChatbot from "@/components/home-page/AIChatbot";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Features = () => {
  return (
    <>
      <div id="features" className="container mx-auto py-12 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Features & Services
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Empowering government officials with cutting-edge technology to
            enhance accessibility and utility of important government documents
            and resources.
          </p>
        </div>

        <FeatureCard />
      </div>

      {/* AI Features */}
      <div className="bg-muted py-12 md:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              AI-Powered Features
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our advanced AI capabilities make information retrieval and
              analysis intuitive and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Voice Search</CardTitle>
                  <CardDescription>
                    Government officials and researchers can retrieve
                    information hands-free.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Automatic Document Indexing</CardTitle>
                  <CardDescription>
                    AI automatically indexes historical laws, regulations, and
                    government white papers.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Smart Summarization</CardTitle>
                  <CardDescription>
                    AI auto-summarizes lengthy policy documents, making it easy
                    for decision-makers to extract key insights.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Content</CardTitle>
                  <CardDescription>
                    AI suggests relevant materials based on user behavior and
                    preferences.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* AI Chat Demo */}
            <AIChatbot />
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
