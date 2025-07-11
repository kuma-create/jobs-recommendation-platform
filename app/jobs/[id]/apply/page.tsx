"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Upload, FileText, User, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PageHeader } from "@/components/page-header"

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader />
        <div className="max-w-2xl mx-auto p-6">
          <Card className="text-center p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">応募完了</h1>
              <p className="text-gray-600">
                ご応募ありがとうございます。
                <br />
                企業からの連絡をお待ちください。
              </p>
            </div>
            <div className="space-y-3">
              <Button onClick={() => router.push("/candidate")} className="w-full">
                ダッシュボードに戻る
              </Button>
              <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                求人一覧に戻る
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="max-w-3xl mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            求人詳細に戻る
          </Button>
        </div>

        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">求人応募</CardTitle>
              <p className="text-gray-600">Senior Frontend Developer - Tech Corp</p>
            </CardHeader>
          </Card>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">氏名 *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="山田太郎"
                  />
                </div>
                <div>
                  <Label htmlFor="email">メールアドレス *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="yamada@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">電話番号 *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="090-1234-5678"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  応募書類
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>履歴書 *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">履歴書をアップロード</p>
                    <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX (最大5MB)</p>
                    <Button type="button" variant="outline">
                      ファイルを選択
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>職務経歴書</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">職務経歴書をアップロード（任意）</p>
                    <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX (最大5MB)</p>
                    <Button type="button" variant="outline">
                      ファイルを選択
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cover Letter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  志望動機・自己PR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                  placeholder="志望動機や自己PRをご記入ください"
                  rows={8}
                  className="resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">{formData.coverLetter.length}/1000文字</p>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                    <span className="text-red-500">*</span>
                    <a href="/terms" className="text-blue-600 hover:underline ml-1">
                      利用規約
                    </a>
                    に同意します
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.agreeToPrivacy}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToPrivacy: checked as boolean }))
                    }
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
                    <span className="text-red-500">*</span>
                    <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                      プライバシーポリシー
                    </a>
                    に同意します
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={!formData.agreeToTerms || !formData.agreeToPrivacy || isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "応募中..." : "応募する"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
