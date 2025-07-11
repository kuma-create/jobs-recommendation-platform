import { Building2, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">JobBoard</span>
          </div>

          <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ページが見つかりません</h1>
          <p className="text-gray-600 mb-8">お探しのページは存在しないか、移動された可能性があります。</p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Home className="h-4 w-4 mr-2" />
              ホームに戻る
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              <Search className="h-4 w-4 mr-2" />
              求人を探す
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
