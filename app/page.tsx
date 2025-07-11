"use client"

import * as React from "react"
import { JobCard } from "@/components/job-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { PageHeader } from "@/components/page-header"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Plus, LayoutGrid, List, Users } from "lucide-react"
import { Building2 } from "lucide-react"
import Link from "next/link"

// Enhanced mock data
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    location: "東京都渋谷区",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    status: "active" as const,
    postedDate: "2024-01-15",
    salary: "600万円〜900万円",
    salaryMin: 600,
    salaryMax: 900,
    industry: "IT・インターネット",
    jobType: "フロントエンドエンジニア",
    ageMin: 25,
    ageMax: 40,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "大阪府大阪市",
    tags: ["Node.js", "React", "PostgreSQL", "AWS"],
    status: "active" as const,
    postedDate: "2024-01-14",
    salary: "500万円〜800万円",
    salaryMin: 500,
    salaryMax: 800,
    industry: "IT・インターネット",
    jobType: "フルスタックエンジニア",
    ageMin: 23,
    ageMax: 35,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "リモート",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    status: "closed" as const,
    postedDate: "2024-01-13",
    salary: "450万円〜650万円",
    salaryMin: 450,
    salaryMax: 650,
    industry: "IT・インターネット",
    jobType: "UI/UXデザイナー",
    ageMin: 22,
    ageMax: 35,
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "Enterprise Solutions",
    location: "京都府京都市",
    tags: ["Python", "Django", "AWS", "Docker"],
    status: "active" as const,
    postedDate: "2024-01-12",
    salary: "550万円〜750万円",
    salaryMin: 550,
    salaryMax: 750,
    industry: "金融・保険",
    jobType: "バックエンドエンジニア",
    ageMin: 25,
    ageMax: 40,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud First",
    location: "東京都新宿区",
    tags: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    status: "draft" as const,
    postedDate: "2024-01-11",
    salary: "650万円〜950万円",
    salaryMin: 650,
    salaryMax: 950,
    industry: "IT・インターネット",
    jobType: "DevOpsエンジニア",
    ageMin: 27,
    ageMax: 45,
  },
  {
    id: 6,
    title: "Product Manager",
    company: "Innovation Labs",
    location: "神奈川県横浜市",
    tags: ["Strategy", "Analytics", "Agile", "Roadmap"],
    status: "active" as const,
    postedDate: "2024-01-10",
    salary: "700万円〜1000万円",
    salaryMin: 700,
    salaryMax: 1000,
    industry: "コンサルティング",
    jobType: "プロダクトマネージャー",
    ageMin: 28,
    ageMax: 45,
  },
  {
    id: 7,
    title: "Data Scientist",
    company: "AI Research Corp",
    location: "東京都港区",
    tags: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    status: "active" as const,
    postedDate: "2024-01-09",
    salary: "800万円〜1200万円",
    salaryMin: 800,
    salaryMax: 1200,
    industry: "IT・インターネット",
    jobType: "データサイエンティスト",
    ageMin: 26,
    ageMax: 40,
  },
  {
    id: 8,
    title: "QA Engineer",
    company: "Quality Systems",
    location: "愛知県名古屋市",
    tags: ["Selenium", "Jest", "Cypress", "API Testing"],
    status: "active" as const,
    postedDate: "2024-01-08",
    salary: "450万円〜650万円",
    salaryMin: 450,
    salaryMax: 650,
    industry: "製造業",
    jobType: "QAエンジニア",
    ageMin: 23,
    ageMax: 38,
  },
]

const allTags = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Figma",
  "Design Systems",
  "Prototyping",
  "User Research",
  "Python",
  "Django",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Terraform",
  "Strategy",
  "Analytics",
  "Agile",
  "Roadmap",
  "Vue.js",
  "Angular",
  "GraphQL",
  "Machine Learning",
  "TensorFlow",
  "SQL",
  "Selenium",
  "Jest",
  "Cypress",
  "API Testing",
]

export default function JobListPage() {
  const [searchKeyword, setSearchKeyword] = React.useState("")
  const [companyName, setCompanyName] = React.useState("")
  const [jobType, setJobType] = React.useState("")
  const [industry, setIndustry] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [ageRange, setAgeRange] = React.useState<[number, number]>([20, 65])
  const [salaryRange, setSalaryRange] = React.useState<[number, number]>([300, 1500])
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const itemsPerPage = 6

  // Enhanced filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword =
      !searchKeyword ||
      job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchKeyword.toLowerCase()))

    const matchesCompany = !companyName || job.company.toLowerCase().includes(companyName.toLowerCase())

    const matchesJobType = !jobType || job.jobType === jobType

    const matchesIndustry = !industry || job.industry === industry

    const matchesLocation = !location || job.location.includes(location) || location === "リモート"

    const matchesAge = job.ageMin <= ageRange[1] && job.ageMax >= ageRange[0]

    const matchesSalary = job.salaryMin <= salaryRange[1] && job.salaryMax >= salaryRange[0]

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => job.tags.includes(tag))

    const matchesStatus = statusFilter === "all" || job.status === statusFilter

    return (
      matchesKeyword &&
      matchesCompany &&
      matchesJobType &&
      matchesIndustry &&
      matchesLocation &&
      matchesAge &&
      matchesSalary &&
      matchesTags &&
      matchesStatus
    )
  })

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchKeyword, companyName, jobType, industry, location, ageRange, salaryRange, selectedTags, statusFilter])

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <div className="flex">
        <FilterSidebar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          companyName={companyName}
          setCompanyName={setCompanyName}
          jobType={jobType}
          setJobType={setJobType}
          industry={industry}
          setIndustry={setIndustry}
          location={location}
          setLocation={setLocation}
          ageRange={ageRange}
          setAgeRange={setAgeRange}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          allTags={allTags}
        />

        <main className="flex-1 p-8">
          {/* Content Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">求人一覧</h2>
              <p className="text-gray-600">
                <span className="font-semibold text-blue-600">{filteredJobs.length}</span>件の求人が見つかりました
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Link href="/candidate">
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  求職者ページ
                </Button>
              </Link>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                新規求人作成
              </Button>
            </div>
          </div>

          {/* Job Grid */}
          {paginatedJobs.length > 0 ? (
            <div
              className={`grid gap-6 mb-8 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Building2 className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">求人が見つかりませんでした</h3>
              <p className="text-gray-600 mb-6">検索条件を変更してもう一度お試しください</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchKeyword("")
                  setCompanyName("")
                  setJobType("")
                  setIndustry("")
                  setLocation("")
                  setAgeRange([20, 65])
                  setSalaryRange([300, 1500])
                  setSelectedTags([])
                  setStatusFilter("all")
                }}
              >
                すべてのフィルターをリセット
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
