"use server";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findDocumentById, findUserById, documents } from "@/lib/mock-data";
import { auth } from "@/auth";
import DocumentClientView from "@/features/documents/DocumentClientView";

// Sample document content for the first document
const sampleContent = `
  <h1>Digital Transformation Policy 2023</h1>
  <h2>Executive Summary</h2>
  <p>This policy document outlines the government's comprehensive strategy for digital transformation across all departments and agencies. The goal is to improve service delivery, increase operational efficiency, and enhance citizen engagement through the strategic use of digital technologies.</p>
    
  <h2>1. Introduction</h2>
  <p>The rapid advancement of digital technologies presents both opportunities and challenges for government operations. This policy establishes a framework for the systematic adoption of digital technologies to transform how government services are delivered and how internal operations are conducted.</p>
    
  <h2>2. Vision and Objectives</h2>
  <p>Our vision is to create a digitally enabled government that delivers efficient, accessible, and personalized services to citizens while optimizing internal processes.</p>
  <p>Key objectives include:</p>
  <ul>
    <li>Enhance citizen experience through digital service delivery</li>
    <li>Improve operational efficiency through process automation</li>
    <li>Strengthen data-driven decision making</li>
    <li>Build digital capabilities within the public sector</li>
    <li>Ensure digital inclusion and accessibility</li>
  </ul>
    
  <h2>3. Strategic Pillars</h2>
  <h3>3.1 Digital Infrastructure</h3>
  <p>Develop robust, secure, and scalable digital infrastructure to support government operations and service delivery.</p>
    
  <h3>3.2 Digital Services</h3>
  <p>Design and deliver citizen-centric digital services that are accessible, intuitive, and efficient.</p>
    
  <h3>3.3 Data Governance</h3>
  <p>Establish frameworks for responsible data collection, management, sharing, and utilization across government.</p>
    
  <h3>3.4 Digital Workforce</h3>
  <p>Build digital capabilities within the public sector through training, recruitment, and organizational change.</p>
    
  <h3>3.5 Digital Inclusion</h3>
  <p>Ensure that digital transformation benefits all citizens regardless of location, ability, or socioeconomic status.</p>
    
  <h2>4. Implementation Framework</h2>
  <p>This policy will be implemented through a phased approach over a five-year period (2023-2028), with regular monitoring and evaluation to track progress and make necessary adjustments.</p>
    
  <h2>5. Governance Structure</h2>
  <p>A Digital Transformation Steering Committee, chaired by the Minister of Technology, will oversee the implementation of this policy. Each department will establish a Digital Transformation Unit responsible for implementing the policy within their respective domains.</p>
    
  <h2>6. Conclusion</h2>
  <p>Digital transformation is essential for modernizing government operations and improving service delivery. This policy provides a comprehensive framework to guide this transformation in a coordinated and strategic manner.</p>
`;

export default async function DocumentDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const document = findDocumentById(params.id)

  if (!document) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
        <p className="mb-6">The document you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/dashboard/documents">Back to Documents</Link>
        </Button>
      </div>
    )
  }

  const author = findUserById(document.authorId)
  const relatedDocuments = documents
    .filter(
      (doc) =>
        doc.id !== document.id &&
        (doc.department === document.department || doc.tags.some((tag) => document.tags.includes(tag)))
    )
    .slice(0, 3)

  return (
    <DocumentClientView
      document={document}
      author={author}
      relatedDocuments={relatedDocuments}
      // isOfficial={isOfficial}
      sampleContent={sampleContent}
    />
  )
}