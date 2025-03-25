import { Header } from "@/components/ui/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { ChartCard } from "@/components/dashboard/chart-card"
import { DonutChart } from "@/components/dashboard/donut-chart"
import { LineChart } from "@/components/dashboard/line-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { Activity, Users, Calendar, MessageSquare, CircleUser, PhoneCall, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  // Sample data for charts
  const donutData = [
    { label: "Medical", value: 3250, color: "#22c55e" },
    { label: "Mental Health", value: 2120, color: "#a855f7" },
    { label: "Resources", value: 1640, color: "#3b82f6" },
  ]

  const lineData = [12, 19, 15, 22, 30, 28, 25, 35, 32, 40, 38, 45]
  const lineLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Sample activity feed data
  const activityItems = [
    {
      id: "1",
      content: "56 New users registered.",
      timestamp: "2 hours ago",
      icon: <CircleUser className="h-5 w-5 text-green-500" />,
    },
    {
      id: "2",
      content: "123 Orders placed.",
      timestamp: "5 hours ago",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "3",
      content: "Funds have been received.",
      timestamp: "1 day ago",
      icon: <Activity className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "4",
      content: "5 Unread messages.",
      timestamp: "2 days ago",
      icon: <MessageSquare className="h-5 w-5 text-yellow-500" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="18,221"
            change={15}
            period="last quarter"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Health Consultations"
            value="3,131"
            change={8.5}
            period="last month"
            icon={<Activity className="h-5 w-5" />}
          />
          <StatCard
            title="Mental Health Sessions"
            value="1,511"
            change={-2.5}
            period="last quarter"
            icon={<PhoneCall className="h-5 w-5" />}
          />
          <StatCard
            title="Resource Requests"
            value="712"
            change={12}
            period="last month"
            icon={<MapPin className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ChartCard title="Service Usage" description="Distribution by category" className="lg:col-span-1">
            <DonutChart data={donutData} centerText="7,010" centerSubtext="Total Users" />
          </ChartCard>

          <ChartCard title="Monthly Activity" description="User engagement over time" className="lg:col-span-2">
            <div className="h-[300px] flex items-center">
              <LineChart data={lineData} labels={lineLabels} height={250} />
            </div>
          </ChartCard>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ChartCard title="Community Impact" className="md:col-span-2">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Total Consultations</p>
                  <p className="text-2xl font-bold text-white mt-1">4,642</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Resources Shared</p>
                  <p className="text-2xl font-bold text-white mt-1">2,891</p>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-400">Health Outreach Progress</p>
                  <p className="text-sm font-medium text-white">71%</p>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "71%" }}></div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-400">Mental Health Support</p>
                  <p className="text-sm font-medium text-white">63%</p>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "63%" }}></div>
                </div>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Activity Feed">
            <ActivityFeed items={activityItems} />
          </ChartCard>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">
              $30 <span className="text-sm font-normal text-gray-400">Per Month Per User</span>
            </h3>
            <p className="text-gray-400 mt-1">Improve your workspace, view and analyze your profits and losses</p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Get Started</Button>
        </div>
      </main>
    </div>
  )
}

