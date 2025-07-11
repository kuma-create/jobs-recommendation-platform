"use client"

import * as React from "react"
import { Heart, Star, TrendingUp, Target, Clock, MapPin, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Job {
  id: number
  title: string
  company: string
  location: string
  tags: string[]
  status: "active" | "closed" | "draft"
  postedDate: string
  salary: string
  salaryMin: number
  salaryMax: number
  industry: string
  jobType: string
  matchScore: number
  matchReasons: string[]
  isRecommended?: boolean
  isFavorite?: boolean
}

interface JobRecommendationsProps {
  userProfile: any
  jobs: Job[]
  onToggleFavorite: (jobId: number) => void
  onApply: (jobId: number) => void
}

export function JobRecommendations({ userProfile, jobs, onToggleFavorite, onApply }: JobRecommendationsProps) {
  const [activeTab, setActiveTab] = React.useState("recommended")

  // Calculate match score based on user profile
  const calculateMatchScore = (job: Job) => {
    let score = 0
    let maxScore = 0

    // Skill matching (40% weight)
    const skillMatches = job.tags.filter((tag) => userProfile.skills.includes(tag)).length
    const skillScore = skillMatches > 0 ? (skillMatches / job.tags.length) * 40 : 0
    score += skillScore
    maxScore += 40

    // Job type matching (25% weight)
    if (userProfile.desiredJobTypes.includes(job.jobType)) {
      score += 25
    }
    maxScore += 25

    // Industry matching (20% weight)
    if (userProfile.desiredIndustries.includes(job.industry)) {
      score += 20
    }
    maxScore += 20

    // Salary matching (15% weight)
    const salaryMatch = job.salaryMin <= userProfile.desiredSalary[1] && job.salaryMax >= userProfile.desiredSalary[0]
    if (salaryMatch) {
      score += 15
    }
    maxScore += 15

    return Math.round((score / maxScore) * 100)
  }

  const getMatchReasons = (job: Job) => {
    const reasons = []

    const skillMatches = job.tags.filter((tag) => userProfile.skills.includes(tag))
    if (skillMatches.length > 0) {
      reasons.push(`${skillMatches.length}つのスキルが一致`)
    }

    if (userProfile.desiredJobTypes.includes(job.jobType)) {
      reasons.push("希望職種と一致")
    }

    if (userProfile.desiredIndustries.includes(job.industry)) {
      reasons.push("希望業界と一致")
    }

    const salaryMatch = job.salaryMin <= userProfile.desiredSalary[1] && job.salaryMax >= userProfile.desiredSalary[0]
    if (salaryMatch) {
      reasons.push("希望年収範囲内")
    }

    return reasons
  }

  // Enhance jobs with match data
  const enhancedJobs = jobs.map((job) => ({
    ...job,
    matchScore: calculateMatchScore(job),
    matchReasons: getMatchReasons(job),
  }))

  const recommendedJobs = enhancedJobs.filter((job) => job.matchScore >= 60).sort((a, b) => b.matchScore - a.matchScore)

  const favoriteJobs = enhancedJobs.filter((job) => job.isFavorite)

  const recentJobs = enhancedJobs
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, 10)

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm hover:shadow-blue-100/50 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              {job.matchScore >= 80 && (
                <Badge className="bg-green-100 text-green-700 text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  高マッチ
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">{job.company}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(job.id)}
            className={job.isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"}
          >
            <Heart className={`h-4 w-4 ${job.isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Match Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">マッチ度</span>
            <span className="text-sm font-bold text-blue-600">{job.matchScore}%</span>
          </div>
          <Progress value={job.matchScore} className="h-2" />
        </div>

        {/* Match Reasons */}
        {job.matchReasons.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {job.matchReasons.map((reason, index) => (
                <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                  <Target className="h-3 w-3 mr-1" />
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{job.location}</span>
          <Clock className="h-4 w-4 ml-2" />
          <span className="text-sm">{job.postedDate}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`text-xs font-medium ${
                userProfile.skills.includes(tag)
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onApply(job.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            size="sm"
          >
            応募する
          </Button>
          <Button variant="outline" size="sm" className="px-4 bg-transparent">
            詳細
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">おすすめ求人</h1>
        <p className="text-gray-600">あなたのプロフィールに基づいて最適な求人をご提案します</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-96">
          <TabsTrigger value="recommended" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            おすすめ ({recommendedJobs.length})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            お気に入り ({favoriteJobs.length})
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            新着 ({recentJobs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-6">
          {recommendedJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {recommendedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">おすすめ求人がありません</h3>
              <p className="text-gray-600 mb-4">プロフィールを充実させると、より多くのおすすめ求人が表示されます</p>
              <Button variant="outline">プロフィールを編集</Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          {favoriteJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {favoriteJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">お気に入りの求人がありません</h3>
              <p className="text-gray-600 mb-4">気になる求人をお気に入りに追加して、後で確認できます</p>
              <Button variant="outline">求人を探す</Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
