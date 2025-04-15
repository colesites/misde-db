"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

// Sample conversation
const initialMessages = [
  {
    role: "assistant",
    content:
      "Hello! I'm the MISDE Database assistant. How can I help you today?",
  },
];

export default function AIChatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      // Add AI response based on user input
      let response = "";

      if (
        input.toLowerCase().includes("policy") ||
        input.toLowerCase().includes("document")
      ) {
        response =
          "I can help you find government policy documents. Our database contains thousands of digitized policy papers. What specific area are you interested in?";
      } else if (
        input.toLowerCase().includes("event") ||
        input.toLowerCase().includes("conference")
      ) {
        response =
          "We have several upcoming government events. The next one is the Digital Government Conference on August 15. Would you like more details?";
      } else if (
        input.toLowerCase().includes("research") ||
        input.toLowerCase().includes("study")
      ) {
        response =
          "Our database includes research from government institutions and universities. I can search for specific topics or provide recent research highlights.";
      } else {
        response =
          "I'd be happy to help with that. Could you provide more details about what you're looking for in the government database?";
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border shadow-lg overflow-hidden"
    >
      <Card className="h-[500px] flex flex-col">
        <CardHeader>
          <CardTitle>MISDE Pilot</CardTitle>
          <CardDescription>
            Ask questions about government documents and research
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar>
                      {message.role === "assistant" ? (
                        <>
                          <AvatarImage src="https://placeholder.co/40x40" />
                          <AvatarFallback>AI</AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="https://placeholder.co/40x40" />
                          <AvatarFallback>You</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "assistant"
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar>
                      <AvatarImage src="https://placeholder.co/40x40" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce"></div>
                        <div
                          className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full gap-2">
            <PlaceholdersAndVanishInput
              placeholders={[
                "Ask about government documents, research, or events...",
              ]}
              onChange={(e) => setInput(e.target.value)}
              onSubmit={handleSubmit}
              className="flex-1"
            />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
