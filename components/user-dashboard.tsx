"use client"

import * as React from "react"
import { User, Briefcase, Heart, TrendingUp, Settings, Bell, FileText, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface UserDashboardProps {
  userProfile: any
  applications: any[]
  recommendations: any[]
  favorites: any[]
}

export function UserDashboard({ userProfile, applications, recommendations, favorites }: UserDashboardProps) {
  const profileCompleteness = React.useMemo(() => {
    let score = 0
    const maxScore = 10

    if (userProfile.name) score += 1
    if (userProfile.email) score += 1
    if (userProfile.phone) score += 1
    if (userProfile.location) score += 1
    if (userProfile.jobTitle) score += 1
    if (userProfile.bio) score += 1
    if (userProfile.skills.length > 0) score += 2
    if (userProfile.desiredJobTypes.length > 0) score += 1
    if (userProfile.desiredIndustries.length > 0) score += 1

    return Math.round((score / maxScore) * 100)
  }, [userProfile])

  const stats = [
    {
      title: "応募中",
      value: applications.filter((app) => app.status === "pending").length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "お気に入り",
      value: favorites.length,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "おすすめ求人",
      value: recommendations.length,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "プロフィール完成度",
      value: `${profileCompleteness}%`,
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-gray-600">こんにちは、{userProfile.name}さん</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            通知設定
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            設定
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Completeness */}
      {profileCompleteness < 100 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-amber-800">プロフィールを完成させましょう</h3>
                <p className="text-sm text-amber-700">プロフィールを充実させると、より良いマッチングが期待できます</p>
              </div>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                編集する
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-amber-700">完成度</span>
                <span className="font-medium text-amber-800">{profileCompleteness}%</span>
              </div>
              <Progress value={profileCompleteness} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              最近の応募
            </CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.slice(0, 5).map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{app.jobTitle}</h4>
                      <p className="text-sm text-gray-600">{app.company}</p>
                      <p className="text-xs text-gray-500">{app.appliedDate}</p>
                    </div>
                    <Badge
                      variant={
                        app.status === "pending" ? "default" : app.status === "accepted" ? "default" : "secondary"
                      }
                      className={
                        app.status === "pending"
                          ? "bg-blue-100 text-blue-700"
                          : app.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {app.status === "pending" ? "選考中" : app.status === "accepted" ? "合格" : "不合格"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">まだ応募していません</p>
                <Button className="mt-4" size="sm">
                  求人を探す
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>クイックアクション</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <User className="h-4 w-4 mr-2" />
              プロフィール編集
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              おすすめ求人を見る
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              お気に入り求人
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Briefcase className="h-4 w-4 mr-2" />
              求人を検索
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
