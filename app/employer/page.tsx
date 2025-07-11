"use client"

import * as React from "react"
import { Plus, Users, Eye, MessageSquare, TrendingUp, Calendar, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"

const mockStats = {
  totalJobs: 12,
  activeJobs: 8,
  totalApplications: 156,
  newApplications: 23,
  totalViews: 2340,
  thisWeekViews: 340,
}

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    status: "active",
    applications: 23,
    views: 156,
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
  },
  {
    id: 2,
    title: "Backend Engineer",
    status: "active",
    applications: 18,
    views: 134,
    postedDate: "2024-01-12",
    deadline: "2024-02-12",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    status: "closed",
    applications: 45,
    views: 289,
    postedDate: "2024-01-01",
    deadline: "2024-01-31",
  },
]

const mockApplications = [
  {
    id: 1,
    candidateName: "田中太郎",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-01-20",
    status: "pending",
    matchScore: 85,
  },
  {
    id: 2,
    candidateName: "佐藤花子",
    jobTitle: "Backend Engineer",
    appliedDate: "2024-01-19",
    status: "interview",
    matchScore: 92,
  },
  {
    id: 3,
    candidateName: "鈴木一郎",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-01-18",
    status: "accepted",
    matchScore: 78,
  },
]

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = React.useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">募集中</Badge>
      case "closed":
        return <Badge variant="secondary">終了</Badge>
      case "draft":
        return <Badge variant="outline">下書き</Badge>
      default:
        return null
    }
  }

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-blue-100 text-blue-700">選考中</Badge>
      case "interview":
        return <Badge className="bg-yellow-100 text-yellow-700">面接</Badge>
      case "accepted":
        return <Badge className="bg-green-100 text-green-700">合格</Badge>
      case "rejected":
        return <Badge variant="secondary">不合格</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">企業ダッシュボード</h1>
            <p className="text-gray-600">求人管理と応募者管理</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              設定
            </Button>
            <Link href="/employer/jobs/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                新規求人作成
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="jobs">求人管理</TabsTrigger>
            <TabsTrigger value="applications">応募者管理</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">掲載求人数</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalJobs}</p>
                      <p className="text-xs text-green-600">募集中: {mockStats.activeJobs}件</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">総応募数</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalApplications}</p>
                      <p className="text-xs text-blue-600">新着: {mockStats.newApplications}件</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-100">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">総閲覧数</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalViews}</p>
                      <p className="text-xs text-purple-600">今週: {mockStats.thisWeekViews}回</p>
                    </div>
                    <div className="p-3 rounded-full bg-purple-100">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">面接予定</p>
                      <p className="text-2xl font-bold text-gray-900">5</p>
                      <p className="text-xs text-orange-600">今週: 3件</p>
                    </div>
                    <div className="p-3 rounded-full bg-orange-100">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>最近の応募</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApplications.slice(0, 5).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{app.candidateName}</p>
                          <p className="text-sm text-gray-600">{app.jobTitle}</p>
                          <p className="text-xs text-gray-500">{app.appliedDate}</p>
                        </div>
                        <div className="text-right">
                          {getApplicationStatusBadge(app.status)}
                          <p className="text-xs text-gray-500 mt-1">マッチ度: {app.matchScore}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>求人パフォーマンス</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockJobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-600">掲載日: {job.postedDate}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(job.status)}
                          <p className="text-xs text-gray-500 mt-1">
                            応募: {job.applications}件 / 閲覧: {job.views}回
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">求人管理</h2>
              <Link href="/employer/jobs/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  新規作成
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          求人タイトル
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ステータス
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          応募数
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          閲覧数
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          締切日
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">掲載日: {job.postedDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(job.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applications}件</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.views}回</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.deadline}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Button variant="outline" size="sm">
                              編集
                            </Button>
                            <Button variant="outline" size="sm">
                              詳細
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">応募者管理</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  フィルター
                </Button>
                <Button variant="outline" size="sm">
                  エクスポート
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          応募者
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          求人
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          応募日
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ステータス
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          マッチ度
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{app.candidateName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{app.jobTitle}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.appliedDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getApplicationStatusBadge(app.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{app.matchScore}%</div>
                              <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${app.matchScore}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Button variant="outline" size="sm">
                              詳細
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">分析・レポート</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>応募数推移</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    グラフエリア（Chart.jsなどで実装）
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>求人別パフォーマンス</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    グラフエリア（Chart.jsなどで実装）
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
