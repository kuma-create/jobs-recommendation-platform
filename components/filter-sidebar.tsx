"use client"

import { Search, X, Filter, MapPin, Building2, Briefcase, Users, Calendar, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface FilterSidebarProps {
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
  companyName: string
  setCompanyName: (company: string) => void
  jobType: string
  setJobType: (type: string) => void
  industry: string
  setIndustry: (industry: string) => void
  location: string
  setLocation: (location: string) => void
  ageRange: [number, number]
  setAgeRange: (range: [number, number]) => void
  salaryRange: [number, number]
  setSalaryRange: (range: [number, number]) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  allTags: string[]
}

export function FilterSidebar({
  searchKeyword,
  setSearchKeyword,
  companyName,
  setCompanyName,
  jobType,
  setJobType,
  industry,
  setIndustry,
  location,
  setLocation,
  ageRange,
  setAgeRange,
  salaryRange,
  setSalaryRange,
  selectedTags,
  setSelectedTags,
  statusFilter,
  setStatusFilter,
  allTags,
}: FilterSidebarProps) {
  const toggleTag = (tag: string) => {
    setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag])
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const clearAllFilters = () => {
    setSearchKeyword("")
    setCompanyName("")
    setJobType("")
    setIndustry("")
    setLocation("")
    setAgeRange([20, 65])
    setSalaryRange([300, 1500])
    setSelectedTags([])
    setStatusFilter("all")
  }

  const statusOptions = [
    { value: "all", label: "すべて", count: 12 },
    { value: "active", label: "募集中", count: 8 },
    { value: "closed", label: "終了", count: 3 },
    { value: "draft", label: "下書き", count: 1 },
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

  const locations = ["東京都", "大阪府", "神奈川県", "愛知県", "福岡県", "京都府", "兵庫県", "リモート"]

  return (
    <div className="w-80 bg-white border-r border-gray-100 h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">検索・フィルター</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-500 hover:text-gray-700">
            クリア
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Search */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Search className="h-4 w-4" />
            基本検索
          </h3>

          {/* Keyword Search */}
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-2 block">キーワード</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="技術、スキル、職種など"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-2 block">企業名</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="会社名を入力"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Job Type */}
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-2 block">職種</Label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="border-gray-200">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="職種を選択" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての職種</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Advanced Search */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            詳細検索
          </h3>

          {/* Industry */}
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-2 block">業界</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="border-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="業界を選択" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての業界</SelectItem>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-2 block">勤務地</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="border-gray-200">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="勤務地を選択" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての地域</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Age Range */}
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-3 block flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              年齢: {ageRange[0]}歳 〜 {ageRange[1]}歳
            </Label>
            <Slider
              value={ageRange}
              onValueChange={(value) => setAgeRange(value as [number, number])}
              max={65}
              min={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>20歳</span>
              <span>65歳</span>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-3 block flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              年収: {salaryRange[0]}万円 〜 {salaryRange[1]}万円
            </Label>
            <Slider
              value={salaryRange}
              onValueChange={(value) => setSalaryRange(value as [number, number])}
              max={1500}
              min={300}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>300万円</span>
              <span>1500万円</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Status Filter */}
        <div>
          <Label className="text-sm font-semibold text-gray-900 mb-3 block">ステータス</Label>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  statusFilter === option.value
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-sm text-gray-500">{option.count}</span>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div>
            <Label className="text-sm font-semibold text-gray-900 mb-3 block">選択中のスキル</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTags.map((tag) => (
                <Badge key={tag} className="bg-blue-600 hover:bg-blue-700 text-white pl-3 pr-1 py-1">
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTags([])}
              className="text-gray-600 border-gray-200"
            >
              スキルをクリア
            </Button>
          </div>
        )}

        {/* Skills */}
        <div>
          <Label className="text-sm font-semibold text-gray-900 mb-3 block">スキル・技術</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700 font-medium">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
