"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PageHeader } from "@/components/page-header"

export default function CreateJobPage() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    title: "",
    company: "Tech Corp",
    location: "",
    jobType: "",
    industry: "",
    employmentType: "正社員",
    workStyle: "",
    salaryMin: "",
    salaryMax: "",
    experience: "",
    education: "",
    description: "",
    requirements: "",
    benefits: "",
    deadline: "",
    tags: [] as string[],
    isRemote: false,
    isUrgent: false,
  })
  const [isSaving, setIsSaving] = React.useState(false)

  const availableTags = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
  ]

  const jobTypes = [
    "フロントエンドエンジニア",
    "バックエンドエンジニア",
    "フルスタックエンジニア",
    "UI/UXデザイナー",
    "プロダクトマネージャー",
    "DevOpsエンジニア",
    "データサイエンティスト",
    "QAエンジニア",
  ]

  const industries = [
    "IT・インターネット",
    "金融・保険",
    "製造業",
    "小売・流通",
    "医療・ヘルスケア",
    "教育",
    "不動産",
    "コンサルティング",
  ]

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const handleSave = async (isDraft = false) => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)

    if (isDraft) {
      // Save as draft
      console.log("Saved as draft")
    } else {
      // Publish job
      console.log("Job published")
      router.push("/employer")
    }
  }

  const handlePreview = () => {
    // Open preview modal or navigate to preview page
    console.log("Preview job")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">新規求人作成</h1>
              <p className="text-gray-600">求人情報を入力してください</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              プレビュー
            </Button>
            <Button variant="outline" onClick={() => handleSave(true)} disabled={isSaving}>
              下書き保存
            </Button>
            <Button onClick={() => handleSave(false)} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "保存中..." : "公開"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">求人タイトル *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="例: Senior Frontend Developer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobType">職種 *</Label>
                  <Select
                    value={formData.jobType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, jobType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="職種を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="industry">業界 *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="業界を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">勤務地 *</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="例: 東京都渋谷区"
                  />
                </div>

                <div>
                  <Label htmlFor="employmentType">雇用形態</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, employmentType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="正社員">正社員</SelectItem>
                      <SelectItem value="契約社員">契約社員</SelectItem>
                      <SelectItem value="派遣社員">派遣社員</SelectItem>
                      <SelectItem value="業務委託">業務委託</SelectItem>
                      <SelectItem value="アルバイト・パート">アルバイト・パート</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="workStyle">勤務形態</Label>
                  <Select
                    value={formData.workStyle}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, workStyle: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="勤務形態を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="オフィス勤務">オフィス勤務</SelectItem>
                      <SelectItem value="リモートワーク">リモートワーク</SelectItem>
                      <SelectItem value="ハイブリッド">ハイブリッド</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salaryMin">年収下限（万円）</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData((prev) => ({ ...prev, salaryMin: e.target.value }))}
                    placeholder="400"
                  />
                </div>

                <div>
                  <Label htmlFor="salaryMax">年収上限（万円）</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData((prev) => ({ ...prev, salaryMax: e.target.value }))}
                    placeholder="800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">必要経験年数</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="経験年数を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="未経験可">未経験可</SelectItem>
                      <SelectItem value="1年以上">1年以上</SelectItem>
                      <SelectItem value="3年以上">3年以上</SelectItem>
                      <SelectItem value="5年以上">5年以上</SelectItem>
                      <SelectItem value="10年以上">10年以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="education">学歴要件</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, education: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="学歴要件を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="不問">不問</SelectItem>
                      <SelectItem value="高校卒業以上">高校卒業以上</SelectItem>
                      <SelectItem value="専門学校卒業以上">専門学校卒業以上</SelectItem>
                      <SelectItem value="大学卒業以上">大学卒業以上</SelectItem>
                      <SelectItem value="大学院卒業以上">大学院卒業以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="deadline">応募締切日</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isRemote"
                    checked={formData.isRemote}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isRemote: checked as boolean }))}
                  />
                  <Label htmlFor="isRemote">リモートワーク可</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isUrgent"
                    checked={formData.isUrgent}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isUrgent: checked as boolean }))}
                  />
                  <Label htmlFor="isUrgent">急募</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>仕事内容</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">詳細説明 *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="業務内容、開発環境、チーム構成などを詳しく記載してください"
                  rows={8}
                />
              </div>

              <div>
                <Label htmlFor="requirements">応募要件</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                  placeholder="必須スキル、歓迎スキル、求める人物像などを記載してください"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="benefits">待遇・福利厚生</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits}
                  onChange={(e) => setFormData((prev) => ({ ...prev, benefits: e.target.value }))}
                  placeholder="給与詳細、休日・休暇、福利厚生などを記載してください"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>スキル・技術タグ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={formData.tags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <Label htmlFor={tag} className="cursor-pointer">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.tags.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">選択中のタグ:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" onClick={() => router.back()}>
              キャンセル
            </Button>
            <Button variant="outline" onClick={() => handleSave(true)} disabled={isSaving}>
              下書き保存
            </Button>
            <Button onClick={() => handleSave(false)} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              {isSaving ? "保存中..." : "求人を公開"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
