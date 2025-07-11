"use client"

import * as React from "react"
import { User, MapPin, Briefcase, Star, Upload, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  jobTitle: string
  experience: number
  skills: string[]
  desiredSalary: [number, number]
  desiredJobTypes: string[]
  desiredIndustries: string[]
  bio: string
  education: string
  languages: string[]
}

interface UserProfileFormProps {
  profile: UserProfile
  onSave: (profile: UserProfile) => void
}

export function UserProfileForm({ profile, onSave }: UserProfileFormProps) {
  const [formData, setFormData] = React.useState<UserProfile>(profile)
  const [availableSkills] = React.useState([
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
    "Vue.js",
    "Angular",
    "Machine Learning",
    "Data Analysis",
    "UI/UX Design",
    "Figma",
    "Photoshop",
  ])

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

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const toggleJobType = (jobType: string) => {
    setFormData((prev) => ({
      ...prev,
      desiredJobTypes: prev.desiredJobTypes.includes(jobType)
        ? prev.desiredJobTypes.filter((t) => t !== jobType)
        : [...prev.desiredJobTypes, jobType],
    }))
  }

  const toggleIndustry = (industry: string) => {
    setFormData((prev) => ({
      ...prev,
      desiredIndustries: prev.desiredIndustries.includes(industry)
        ? prev.desiredIndustries.filter((i) => i !== industry)
        : [...prev.desiredIndustries, industry],
    }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">プロフィール設定</h1>
          <p className="text-gray-600">あなたの情報を入力して、最適な求人を見つけましょう</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          保存
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              基本情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">氏名</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="山田太郎"
              />
            </div>
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="yamada@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="090-1234-5678"
              />
            </div>
            <div>
              <Label htmlFor="location">居住地</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="居住地を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="東京都">東京都</SelectItem>
                  <SelectItem value="大阪府">大阪府</SelectItem>
                  <SelectItem value="神奈川県">神奈川県</SelectItem>
                  <SelectItem value="愛知県">愛知県</SelectItem>
                  <SelectItem value="福岡県">福岡県</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              職歴情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="jobTitle">現在の職種</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="フロントエンドエンジニア"
              />
            </div>
            <div>
              <Label>経験年数: {formData.experience}年</Label>
              <Slider
                value={[formData.experience]}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value[0] }))}
                max={20}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="education">最終学歴</Label>
              <Select
                value={formData.education}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, education: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="学歴を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="高校卒業">高校卒業</SelectItem>
                  <SelectItem value="専門学校卒業">専門学校卒業</SelectItem>
                  <SelectItem value="大学卒業">大学卒業</SelectItem>
                  <SelectItem value="大学院卒業">大学院卒業</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bio">自己紹介</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                placeholder="あなたの経験やスキル、キャリア目標について教えてください"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              スキル・技術
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableSkills.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{skill}</span>
                </label>
              ))}
            </div>
            {formData.skills.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm font-medium mb-2 block">選択中のスキル:</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} className="bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Desired Conditions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              希望条件
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">
                希望年収: {formData.desiredSalary[0]}万円 〜 {formData.desiredSalary[1]}万円
              </Label>
              <Slider
                value={formData.desiredSalary}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, desiredSalary: value as [number, number] }))
                }
                max={1500}
                min={300}
                step={50}
                className="w-full"
              />
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium mb-3 block">希望職種</Label>
              <div className="grid grid-cols-2 gap-2">
                {jobTypes.map((jobType) => (
                  <label
                    key={jobType}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.desiredJobTypes.includes(jobType)}
                      onChange={() => toggleJobType(jobType)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{jobType}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium mb-3 block">希望業界</Label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((industry) => (
                  <label
                    key={industry}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.desiredIndustries.includes(industry)}
                      onChange={() => toggleIndustry(industry)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{industry}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Upload */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              履歴書・職務経歴書
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">ファイルをドラッグ&ドロップまたはクリックしてアップロード</p>
              <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX (最大10MB)</p>
              <Button variant="outline">ファイルを選択</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
