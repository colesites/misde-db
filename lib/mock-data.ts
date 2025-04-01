// Mock user data
export const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@gov.ng",
      password: "$2a$10$8r84Qj879Rw5VHqIO.BsQOuXdpOzWJ9Bd5qZK3fGMTEMvtUVEqLHW", // "password123"
      role: "ADMIN",
      department: "Technology",
      position: "Director",
      isVerified: true,
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-01-15"),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@gov.ng",
      password: "$2a$10$8r84Qj879Rw5VHqIO.BsQOuXdpOzWJ9Bd5qZK3fGMTEMvtUVEqLHW", // "password123"
      role: "USER",
      department: "Education",
      position: "Analyst",
      isVerified: true,
      createdAt: new Date("2023-02-20"),
      updatedAt: new Date("2023-02-20"),
    },
    {
      id: "3",
      name: "Ade Johnson",
      email: "ade@example.com",
      password: "$2a$10$8r84Qj879Rw5VHqIO.BsQOuXdpOzWJ9Bd5qZK3fGMTEMvtUVEqLHW", // "password123"
      role: "PUBLIC",
      department: null,
      position: null,
      isVerified: true,
      createdAt: new Date("2023-03-10"),
      updatedAt: new Date("2023-03-10"),
    },
  ]
  
  // Mock document data
  export const documents = [
    {
      id: "1",
      title: "Digital Transformation Policy 2023",
      content:
        "This policy document outlines the government's strategy for digital transformation across all departments...",
      type: "Policy Document",
      department: "Technology",
      fileUrl: "/documents/digital-transformation-policy.pdf",
      isPublic: true,
      authorId: "1",
      createdAt: new Date("2023-07-25"),
      updatedAt: new Date("2023-07-28"),
      tags: ["Digital", "Policy", "Technology", "Transformation", "E-Government"],
    },
    {
      id: "2",
      title: "Economic Development Strategy",
      content: "A comprehensive strategy for economic development in the state...",
      type: "Research Paper",
      department: "Finance",
      fileUrl: "/documents/economic-development-strategy.pdf",
      isPublic: true,
      authorId: "2",
      createdAt: new Date("2023-07-24"),
      updatedAt: new Date("2023-07-24"),
      tags: ["Economy", "Research", "Development"],
    },
    {
      id: "3",
      title: "Education Reform Initiative",
      content: "Proposed reforms to improve the education system...",
      type: "White Paper",
      department: "Education",
      fileUrl: "/documents/education-reform-initiative.pdf",
      isPublic: true,
      authorId: "2",
      createdAt: new Date("2023-07-22"),
      updatedAt: new Date("2023-07-22"),
      tags: ["Education", "Reform", "Policy"],
    },
    {
      id: "4",
      title: "Health Services Improvement Plan",
      content: "A plan to improve health services across the state...",
      type: "Strategic Plan",
      department: "Health",
      fileUrl: "/documents/health-services-improvement.pdf",
      isPublic: true,
      authorId: "1",
      createdAt: new Date("2023-07-20"),
      updatedAt: new Date("2023-07-20"),
      tags: ["Health", "Services", "Planning"],
    },
    {
      id: "5",
      title: "Agricultural Modernization Program",
      content: "A program to modernize agricultural practices in the state...",
      type: "Report",
      department: "Agriculture",
      fileUrl: "/documents/agricultural-modernization.pdf",
      isPublic: true,
      authorId: "1",
      createdAt: new Date("2023-07-18"),
      updatedAt: new Date("2023-07-18"),
      tags: ["Agriculture", "Modernization", "Development"],
    },
  ]
  
  // Mock events data
  export const events = [
    {
      id: "1",
      title: "Digital Government Conference",
      description: "Join government officials for discussions on digital transformation in governance.",
      date: new Date("2023-08-15"),
      location: "Government House, Ekiti",
      isVirtual: false,
      createdAt: new Date("2023-06-10"),
      updatedAt: new Date("2023-06-10"),
    },
    {
      id: "2",
      title: "AI in Public Service Workshop",
      description: "Learn how AI is transforming public service delivery and government operations.",
      date: new Date("2023-09-05"),
      location: "Virtual Event",
      isVirtual: true,
      createdAt: new Date("2023-06-15"),
      updatedAt: new Date("2023-06-15"),
    },
    {
      id: "3",
      title: "Data Privacy & Security Summit",
      description: "Explore best practices for protecting government and citizen data.",
      date: new Date("2023-10-20"),
      location: "Conference Center, Ado-Ekiti",
      isVirtual: false,
      createdAt: new Date("2023-06-20"),
      updatedAt: new Date("2023-06-20"),
    },
  ]
  
  // Helper functions to simulate database operations
  export function findUserByEmail(email: string) {
    return users.find((user) => user.email === email) || null
  }
  
  export function findUserById(id: string) {
    return users.find((user) => user.id === id) || null
  }
  
  export function findDocumentById(id: string) {
    return documents.find((doc) => doc.id === id) || null
  }
  
  export function getDocumentsByAuthorId(authorId: string) {
    return documents.filter((doc) => doc.authorId === authorId)
  }
  
  export function getRecentDocuments(limit = 5) {
    return [...documents].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, limit)
  }
  
  export function getUpcomingEvents(limit = 3) {
    const now = new Date()
    return [...events]
      .filter((event) => event.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, limit)
  }
  