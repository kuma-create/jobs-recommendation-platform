"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Briefcase,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"

// Mock job data
const mockJob = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "Tech Corp",
  companyLogo: "/placeholder.svg?height=80&width=80",
  location: "東京都渋谷区",
  tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest"],
  status: "active" as const,
  postedDate: "2024-01-15",
  deadline: "2024-02-15",
  salary: "600万円〜900万円",
  salaryMin: 600,
  salaryMax: 900,
  industry: "IT・インターネット",
  jobType: "フロントエンドエンジニア",
  employmentType: "正社員",
  workStyle: "ハイブリッド",
  experience: "3年以上",
  education: "大学卒業以上",
  description: `
私たちは次世代のWebアプリケーションを開発するフロントエンドエンジニアを募集しています。

【業務内容】
• React/Next.jsを使用したWebアプリケーション開発
• UI/UXデザイナーとの協業によるユーザーインターフェース実装
• パフォーマンス最適化とアクセシビリティ対応
• コードレビューとチーム開発プロセスの改善
• 新技術の調査・検証・導入

【開発環境】
• フロントエンド: React, Next.js, TypeScript, Tailwind CSS
• バックエンド: Node.js, GraphQL, PostgreSQL
• インフラ: AWS, Docker, Kubernetes
• ツール: GitHub, Figma, Slack, Notion

【求める人物像】
• React/TypeScriptでの開発経験3年以上
• モダンなフロントエンド開発手法への理解
• ユーザー体験を重視した開発ができる方
• チームワークを大切にし、積極的にコミュニケーションが取れる方
• 新しい技術への学習意欲が高い方
  `,
  benefits: [
    "完全週休2日制（土日祝）",
    "年間休日125日",
    "フレックスタイム制",
    "リモートワーク可",
    "交通費全額支給",
    "各種社会保険完備",
    "退職金制度",
    "資格取得支援制度",
    "書籍購入補助",
    "健康診断・人間ドック補助",
  ],
  companyInfo: {
    name: "Tech Corp",
    established: "2015年",
    employees: "150名",
    capital: "5億円",
    business: "Webサービス開発・運営、システム開発",
    website: "https://techcorp.example.com",
  },
  applicationCount: 23,
  viewCount: 156,
  isFavorite: false,
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = React.useState(mockJob)
  const [isApplying, setIsApplying] = React.useState(false)

  const handleToggleFavorite = () => {
    setJob((prev) => ({ ...prev, isFavorite: !prev.isFavorite }))
  }

  const handleApply = () => {
    setIsApplying(true)
    router.push(`/jobs/${params.id}/apply`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    // Show toast notification
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={job.company}
                      className="w-16 h-16 rounded-lg border"
                    />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {job.postedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.applicationCount}名応募
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleToggleFavorite}
                      className={job.isFavorite ? "text-red-500 border-red-200" : ""}
                    >
                      <Heart className={`h-4 w-4 ${job.isFavorite ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>

                {/* Job Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">年収</div>
                    <div className="font-semibold">{job.salary}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Briefcase className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">雇用形態</div>
                    <div className="font-semibold">{job.employmentType}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">勤務形態</div>
                    <div className="font-semibold">{job.workStyle}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">経験</div>
                    <div className="font-semibold">{job.experience}</div>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleApply}
                    disabled={isApplying}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                  >
                    {isApplying ? "応募中..." : "この求人に応募する"}
                  </Button>
                  <Link href={`/companies/${job.company}`}>
                    <Button variant="outline" className="px-6 py-3 bg-transparent">
                      企業詳細
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Job Details Tabs */}
            <Card>
              <Tabs defaultValue="description" className="w-full">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">仕事内容</TabsTrigger>
                    <TabsTrigger value="benefits">待遇・福利厚生</TabsTrigger>
                    <TabsTrigger value="company">会社情報</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent>
                  <TabsContent value="description" className="space-y-4">
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                        {job.description}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="benefits" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="company" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">会社名</label>
                          <p className="text-gray-900 font-medium">{job.companyInfo.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">設立年</label>
                          <p className="text-gray-900">{job.companyInfo.established}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">従業員数</label>
                          <p className="text-gray-900">{job.companyInfo.employees}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">資本金</label>
                          <p className="text-gray-900">{job.companyInfo.capital}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">事業内容</label>
                          <p className="text-gray-900">{job.companyInfo.business}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Webサイト</label>
                          <a
                            href={job.companyInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {job.companyInfo.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Deadline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  応募締切
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">{job.deadline}</div>
                  <div className="text-sm text-gray-600">まで</div>
                </div>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>求人統計</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">応募者数</span>
                  <span className="font-semibold">{job.applicationCount}名</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">閲覧数</span>
                  <span className="font-semibold">{job.viewCount}回</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">掲載日</span>
                  <span className="font-semibold">{job.postedDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>類似求人</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">Frontend Developer</h4>
                    <p className="text-xs text-gray-600 mb-2">Web Agency Inc.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">500-700万円</span>
                      <Badge variant="outline" className="text-xs">
                        React
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
