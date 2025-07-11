"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Building2, MapPin, Users, Globe, Mail, Phone, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { JobCard } from "@/components/job-card"

const mockCompany = {
  id: 1,
  name: "Tech Corp",
  logo: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=300&width=800",
  industry: "IT・インターネット",
  location: "東京都渋谷区",
  established: "2015年",
  employees: "150名",
  capital: "5億円",
  website: "https://techcorp.example.com",
  email: "recruit@techcorp.example.com",
  phone: "03-1234-5678",
  description: `
Tech Corpは、次世代のWebテクノロジーで世界を変える企業です。

【企業理念】
「テクノロジーで人々の生活をより豊かに」

私たちは2015年の設立以来、革新的なWebサービスの開発・運営を通じて、
ユーザーの課題解決と価値創造に取り組んでいます。

【事業内容】
• SaaSプロダクトの開発・運営
• エンタープライズ向けシステム開発
• AI・機械学習ソリューション
• クラウドインフラ構築・運用

【技術スタック】
フロントエンド: React, Next.js, TypeScript, Tailwind CSS
バックエンド: Node.js, Python, Go, GraphQL
データベース: PostgreSQL, MongoDB, Redis
インフラ: AWS, Docker, Kubernetes
  `,
  culture: [
    "フラットな組織文化",
    "技術への投資を惜しまない",
    "ワークライフバランス重視",
    "多様性を尊重する環境",
    "継続的な学習をサポート",
  ],
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
  rating: 4.2,
  reviewCount: 28,
  openJobs: 5,
}

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    location: "東京都渋谷区",
    tags: ["React", "TypeScript", "Next.js"],
    status: "active" as const,
    postedDate: "2024-01-15",
    salary: "600万円〜900万円",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Tech Corp",
    location: "東京都渋谷区",
    tags: ["Node.js", "Python", "AWS"],
    status: "active" as const,
    postedDate: "2024-01-12",
    salary: "550万円〜800万円",
  },
]

export default function CompanyDetailPage() {
  const params = useParams()
  const [company] = React.useState(mockCompany)
  const [jobs] = React.useState(mockJobs)

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-6xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
          <img
            src={company.coverImage || "/placeholder.svg"}
            alt={company.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        <div className="px-6 pb-6">
          {/* Company Header */}
          <div className="relative -mt-16 mb-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="w-24 h-24 rounded-lg border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
                        <div className="flex items-center gap-4 text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {company.industry}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {company.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {company.employees}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{company.rating}</span>
                            <span className="text-gray-500">({company.reviewCount}件)</span>
                          </div>
                          <Badge variant="secondary">{company.openJobs}件の求人</Badge>
                        </div>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">フォローする</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">企業情報</TabsTrigger>
                  <TabsTrigger value="jobs">求人一覧</TabsTrigger>
                  <TabsTrigger value="culture">企業文化</TabsTrigger>
                  <TabsTrigger value="reviews">口コミ</TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>企業について</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                          {company.description}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="jobs">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">募集中の求人</h2>
                      <Badge variant="outline">{jobs.length}件</Badge>
                    </div>
                    <div className="grid gap-6">
                      {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="culture">
                  <Card>
                    <CardHeader>
                      <CardTitle>企業文化・働く環境</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {company.culture.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                            <Star className="h-5 w-5 text-blue-600" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${star <= 4 ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">フロントエンドエンジニア</span>
                              </div>
                              <p className="text-gray-700">
                                技術への投資が積極的で、新しい技術を学ぶ機会が多い。
                                チームワークが良く、困った時はすぐにサポートしてもらえる環境です。
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">2024/01/10</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>基本情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">設立年</span>
                    <span className="font-medium">{company.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">従業員数</span>
                    <span className="font-medium">{company.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">資本金</span>
                    <span className="font-medium">{company.capital}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>連絡先</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a href={company.website} className="text-blue-600 hover:underline text-sm">
                      {company.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{company.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{company.phone}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>福利厚生</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {company.benefits.slice(0, 5).map((benefit, index) => (
                      <div key={index} className="text-sm text-gray-700">
                        • {benefit}
                      </div>
                    ))}
                    {company.benefits.length > 5 && (
                      <div className="text-sm text-blue-600 cursor-pointer hover:underline">
                        +{company.benefits.length - 5}件をもっと見る
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
