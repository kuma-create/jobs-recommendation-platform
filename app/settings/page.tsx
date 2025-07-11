"use client"

import * as React from "react"
import { User, Bell, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/page-header"

export default function SettingsPage() {
  const [profile, setProfile] = React.useState({
    name: "田中太郎",
    email: "tanaka@example.com",
    phone: "090-1234-5678",
    company: "Tech Corp",
    position: "採用担当者",
    bio: "IT企業で採用業務を担当しています。",
  })

  const [notifications, setNotifications] = React.useState({
    emailApplications: true,
    emailMessages: true,
    emailUpdates: false,
    pushApplications: true,
    pushMessages: true,
    pushUpdates: false,
  })

  const [privacy, setPrivacy] = React.useState({
    profileVisible: true,
    contactInfoVisible: false,
    activityVisible: true,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">設定</h1>
          <p className="text-gray-600">アカウント設定と環境設定を管理</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">プロフィール</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
            <TabsTrigger value="privacy">プライバシー</TabsTrigger>
            <TabsTrigger value="billing">請求</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">氏名</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">電話番号</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">会社名</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile((prev) => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="position">役職</Label>
                  <Input
                    id="position"
                    value={profile.position}
                    onChange={(e) => setProfile((prev) => ({ ...prev, position: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                  />
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">変更を保存</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  通知設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">メール通知</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailApplications">新規応募通知</Label>
                        <p className="text-sm text-gray-600">新しい応募があった時にメールで通知</p>
                      </div>
                      <Switch
                        id="emailApplications"
                        checked={notifications.emailApplications}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, emailApplications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailMessages">メッセージ通知</Label>
                        <p className="text-sm text-gray-600">新しいメッセージを受信した時にメールで通知</p>
                      </div>
                      <Switch
                        id="emailMessages"
                        checked={notifications.emailMessages}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailMessages: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailUpdates">システム更新通知</Label>
                        <p className="text-sm text-gray-600">システムの更新情報をメールで通知</p>
                      </div>
                      <Switch
                        id="emailUpdates"
                        checked={notifications.emailUpdates}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailUpdates: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">プッシュ通知</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushApplications">新規応募通知</Label>
                        <p className="text-sm text-gray-600">ブラウザでプッシュ通知を受信</p>
                      </div>
                      <Switch
                        id="pushApplications"
                        checked={notifications.pushApplications}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, pushApplications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushMessages">メッセージ通知</Label>
                        <p className="text-sm text-gray-600">ブラウザでプッシュ通知を受信</p>
                      </div>
                      <Switch
                        id="pushMessages"
                        checked={notifications.pushMessages}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushMessages: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">設定を保存</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  プライバシー設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profileVisible">プロフィール公開</Label>
                      <p className="text-sm text-gray-600">他のユーザーがあなたのプロフィールを閲覧可能</p>
                    </div>
                    <Switch
                      id="profileVisible"
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, profileVisible: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="contactInfoVisible">連絡先情報公開</Label>
                      <p className="text-sm text-gray-600">メールアドレスや電話番号を他のユーザーに公開</p>
                    </div>
                    <Switch
                      id="contactInfoVisible"
                      checked={privacy.contactInfoVisible}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, contactInfoVisible: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="activityVisible">活動履歴公開</Label>
                      <p className="text-sm text-gray-600">求人投稿や応募活動の履歴を公開</p>
                    </div>
                    <Switch
                      id="activityVisible"
                      checked={privacy.activityVisible}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, activityVisible: checked }))}
                    />
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">設定を保存</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  請求・支払い
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">現在のプラン</h3>
                  <p className="text-blue-700">スタンダードプラン - ¥9,800/月</p>
                  <p className="text-sm text-blue-600 mt-1">次回請求日: 2024年2月15日</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">支払い方法</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">**** **** **** 1234</p>
                          <p className="text-sm text-gray-600">有効期限: 12/26</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        変更
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">請求履歴</h3>
                  <div className="space-y-3">
                    {[
                      { date: "2024年1月15日", amount: "¥9,800", status: "支払い済み" },
                      { date: "2023年12月15日", amount: "¥9,800", status: "支払い済み" },
                      { date: "2023年11月15日", amount: "¥9,800", status: "支払い済み" },
                    ].map((bill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{bill.date}</p>
                          <p className="text-sm text-gray-600">{bill.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{bill.amount}</p>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            領収書
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
