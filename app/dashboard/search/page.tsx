"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Mic, Search, Sparkles, StopCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample search results
const sampleResults = [
  {
    id: "1",
    title: "Digital Transformation Policy 2023",
    type: "Policy Document",
    department: "Technology",
    excerpt:
      "...outlines the government's strategy for <mark>digital transformation</mark> across all departments. It includes guidelines for <mark>technology adoption</mark>, digital service delivery...",
    relevance: 98,
    tags: ["Digital", "Policy", "Technology"],
    date: "2023-07-25",
  },
  {
    id: "2",
    title: "IT Infrastructure Modernization Plan",
    type: "Strategic Plan",
    department: "Technology",
    excerpt:
      "...comprehensive plan for upgrading government <mark>IT infrastructure</mark> to support <mark>digital transformation</mark> initiatives. The plan addresses network upgrades...",
    relevance: 92,
    tags: ["IT", "Infrastructure", "Technology"],
    date: "2023-06-15",
  },
  {
    id: "3",
    title: "Digital Service Standards",
    type: "Guideline",
    department: "Technology",
    excerpt:
      "...standards for the design and delivery of digital services. These standards ensure that government digital services are user-centered, accessible, and secure...",
    relevance: 85,
    tags: ["Digital", "Standards", "Services"],
    date: "2023-05-10",
  },
  {
    id: "4",
    title: "Data Governance Framework",
    type: "Policy Document",
    department: "Technology",
    excerpt:
      "...framework for the management, protection, and utilization of government data. It establishes principles for data collection, storage, sharing, and analysis...",
    relevance: 78,
    tags: ["Data", "Governance", "Policy"],
    date: "2023-04-20",
  },
  {
    id: "5",
    title: "Cybersecurity Strategy 2023-2025",
    type: "Strategic Plan",
    department: "Technology",
    excerpt:
      "...strategy for protecting government digital assets from cyber threats. It outlines measures for threat detection, incident response, and security awareness...",
    relevance: 72,
    tags: ["Cybersecurity", "Security", "Strategy"],
    date: "2023-03-15",
  },
]

export default function SemanticSearchPage() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof sampleResults | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    setSearchResults(null)

    // Simulate API call for semantic search
    setTimeout(() => {
      setSearchResults(sampleResults)
      setIsSearching(false)
    }, 1500)
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      // In a real app, you would process the recorded audio here
    } else {
      setIsRecording(true)
      // In a real app, you would start recording here

      // Simulate receiving a transcription after 2 seconds
      setTimeout(() => {
        setQuery("digital transformation technology adoption")
        setIsRecording(false)
      }, 2000)
    }
  }

  const filteredResults = searchResults
    ? activeTab === "all"
      ? searchResults
      : searchResults.filter(
          (result) =>
            result.type.toLowerCase().includes(activeTab) || result.department.toLowerCase().includes(activeTab),
        )
    : null

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Semantic Search</h1>
          <p className="text-muted-foreground">Ask questions or search for concepts across all government documents</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={toggleRecording}
                className="flex-shrink-0"
              >
                {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for concepts, topics, or ask questions..."
                  className="pl-10"
                  disabled={isRecording}
                />
              </div>

              <Button type="submit" disabled={!query.trim() || isSearching || isRecording}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </form>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Try searching for:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "digital transformation strategy",
                  "healthcare policy innovations",
                  "education reform initiatives",
                  "environmental protection measures",
                  "economic development plans",
                ].map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {isSearching && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-medium mb-2">Searching documents...</h3>
            <p className="text-muted-foreground">Our AI is analyzing documents to find the most relevant results</p>
          </div>
        )}

        {searchResults && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{searchResults.length} results found</h2>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="policy">Policy</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="strategic">Strategic</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <AnimatePresence>
              {filteredResults?.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="mb-4">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-md bg-primary/10">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <Link
                              href={`/dashboard/documents/${result.id}`}
                              className="text-lg font-medium hover:text-primary hover:underline"
                            >
                              {result.title}
                            </Link>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-sm text-muted-foreground">
                            <span>{result.type}</span>
                            <span>•</span>
                            <span>{result.department}</span>
                            <span>•</span>
                            <span>{result.date}</span>
                          </div>

                          <p
                            className="text-muted-foreground mb-3"
                            dangerouslySetInnerHTML={{ __html: result.excerpt }}
                          />

                          <div className="flex flex-wrap gap-2">
                            {result.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            {result.relevance}%
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">Relevance</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
