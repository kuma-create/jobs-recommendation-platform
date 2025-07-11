import { MapPin, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Job {
  id: number
  title: string
  company: string
  location: string
  tags: string[]
  status: "active" | "closed" | "draft"
  postedDate: string
  salary?: string
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">募集中</Badge>
      case "closed":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
            終了
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="border-amber-200 text-amber-700">
            下書き
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm hover:shadow-blue-100/50 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">{job.company}</span>
            </div>
          </div>
          {getStatusBadge(job.status)}
        </div>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{job.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.tags.length - 3}
            </Badge>
          )}
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          size="sm"
        >
          詳細を見る
        </Button>
      </CardContent>
    </Card>
  )
}
