"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Sparkles, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm the MISDE Database AI assistant. How can I help you today? You can ask me about government documents, policies, or research papers.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock speech recognition
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, you would process the recorded audio here
    } else {
      setIsRecording(true);
      // In a real app, you would start recording here

      // Simulate receiving a transcription after 2 seconds
      setTimeout(() => {
        setInput("What are the latest education policies?");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real app, you would call your AI API here
      // const response = await fetch("/api/chatbot", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ message: input }),
      // });
      // const data = await response.json();

      // Simulate AI response with a delay
      setTimeout(() => {
        let aiResponse = "";

        if (input.toLowerCase().includes("education")) {
          aiResponse =
            "The latest education policies include the 'Digital Education Initiative 2023' and the 'School Improvement Program'. These policies focus on integrating technology in classrooms and improving educational outcomes. Would you like me to provide more details on either of these policies?";
        } else if (input.toLowerCase().includes("health")) {
          aiResponse =
            "Recent health policies include the 'Healthcare Access Expansion Act' and the 'Medical Services Digitization Program'. These aim to improve healthcare access in rural areas and modernize medical record-keeping. I can provide more specific information if needed.";
        } else if (
          input.toLowerCase().includes("document") ||
          input.toLowerCase().includes("find")
        ) {
          aiResponse =
            "I can help you find documents in our database. Could you specify what kind of documents you're looking for? For example, you can search by department (e.g., Education, Health), by type (e.g., Policy Paper, Research Report), or by keyword.";
        } else {
          aiResponse =
            "Thank you for your question. I've found several relevant documents in our database that might be helpful. Would you like me to summarize them or provide the full text? You can also narrow your search by specifying a department or time period.";
        }

        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: aiResponse,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsLoading(false);

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">MISDE Pilot</h1>
        <p className="text-muted-foreground">
          Ask questions about government documents, policies, or research papers
        </p>
      </div>

      <Card className="border shadow-md mb-4">
        <CardContent className="p-0">
          <div className="h-[60vh] overflow-y-auto p-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 mb-4 ${
                    message.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`px-4 py-3 rounded-lg max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-muted"
                        : "bg-primary text-primary-foreground ml-auto"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 mb-4"
                >
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-3 rounded-lg bg-muted max-w-[80%]">
                    <div className="flex space-x-2">
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
                </motion.div>
              )}
              <div ref={messagesEndRef}></div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Button
          type="button"
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          onClick={toggleRecording}
          className="flex-shrink-0"
        >
          {isRecording ? (
            <StopCircle className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about government documents, policies, or research..."
          className="flex-1"
          disabled={isLoading || isRecording}
        />

        <Button
          type="submit"
          disabled={!input.trim() || isLoading || isRecording}
          className="flex-shrink-0"
        >
          <Send className="h-5 w-5 mr-2" />
          Send
        </Button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Suggested Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "What are the latest education policies?",
            "Find healthcare research from the past year",
            "Show me technology innovation documents",
            "What upcoming government events are there?",
          ].map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto py-2 px-4"
              onClick={() => setInput(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
