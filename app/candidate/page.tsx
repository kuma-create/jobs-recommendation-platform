"use client"

import * as React from "react"
import { UserProfileForm } from "@/components/user-profile-form"
import { JobRecommendations } from "@/components/job-recommendations"
import { UserDashboard } from "@/components/user-dashboard"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock user profile
const mockUserProfile = {
  name: "田中太郎",
  email: "tanaka@example.com",
  phone: "090-1234-5678",
  location: "東京都",
  jobTitle: "フロントエンドエンジニア",
  experience: 3,
  skills: ["React", "TypeScript", "Next.js", "Node.js"],
  desiredSalary: [500, 800] as [number, number],
  desiredJobTypes: ["フロントエンドエンジニア", "フルスタックエンジニア"],
  desiredIndustries: ["IT・インターネット"],
  bio: "3年間のフロントエンド開発経験があります。React、TypeScriptを使った開発が得意で、ユーザー体験を重視したWebアプリケーション開発に取り組んでいます。",
  education: "大学卒業",
  languages: ["日本語", "英語"],
}

// Mock jobs data with enhanced information
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    location: "東京都渋谷区",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    status: "active" as const,
    postedDate: "2024-01-15",
    salary: "600万円〜900万円",
    salaryMin: 600,
    salaryMax: 900,
    industry: "IT・インターネット",
    jobType: "フロントエンドエンジニア",
    matchScore: 0,
    matchReasons: [],
    isFavorite: false,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "大阪府大阪市",
    tags: ["Node.js", "React", "PostgreSQL", "AWS"],
    status: "active" as const,
    postedDate: "2024-01-14",
    salary: "500万円〜800万円",
    salaryMin: 500,
    salaryMax: 800,
    industry: "IT・インターネット",
    jobType: "フルスタックエンジニア",
    matchScore: 0,
    matchReasons: [],
    isFavorite: true,
  },
  // Add more jobs...
]

const mockApplications = [
  {
    jobTitle: "Frontend Developer",
    company: "Tech Startup",
    appliedDate: "2024-01-10",
    status: "pending",
  },
  {
    jobTitle: "React Developer",
    company: "Web Agency",
    appliedDate: "2024-01-08",
    status: "accepted",
  },
]

export default function CandidatePage() {
  const [userProfile, setUserProfile] = React.useState(mockUserProfile)
  const [jobs, setJobs] = React.useState(mockJobs)
  const [applications] = React.useState(mockApplications)
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const handleSaveProfile = (profile: typeof mockUserProfile) => {
    setUserProfile(profile)
    // Here you would typically save to a backend
    console.log("Profile saved:", profile)
  }

  const handleToggleFavorite = (jobId: number) => {
    setJobs((prevJobs) => prevJobs.map((job) => (job.id === jobId ? { ...job, isFavorite: !job.isFavorite } : job)))
  }

  const handleApply = (jobId: number) => {
    // Handle job application
    console.log("Applied to job:", jobId)
    // You would typically navigate to an application form or show a modal
  }

  const favoriteJobs = jobs.filter((job) => job.isFavorite)
  const recommendedJobs = jobs.filter((job) => job.matchScore >= 60)

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="dashboard">ダッシュボード</TabsTrigger>
            <TabsTrigger value="recommendations">おすすめ</TabsTrigger>
            <TabsTrigger value="profile">プロフィール</TabsTrigger>
            <TabsTrigger value="applications">応募履歴</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <UserDashboard
              userProfile={userProfile}
              applications={applications}
              recommendations={recommendedJobs}
              favorites={favoriteJobs}
            />
          </TabsContent>

          <TabsContent value="recommendations">
            <JobRecommendations
              userProfile={userProfile}
              jobs={jobs}
              onToggleFavorite={handleToggleFavorite}
              onApply={handleApply}
            />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfileForm profile={userProfile} onSave={handleSaveProfile} />
          </TabsContent>

          <TabsContent value="applications">
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">応募履歴</h2>
              <p className="text-gray-600">応募した求人の状況を確認できます</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
