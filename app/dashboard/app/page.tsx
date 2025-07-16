"use client"

import { useState, useEffect, useRef } from "react"
import {
  Bell,
  Search,
  TrendingUp,
  Users,
  Heart,
  Target,
  AlertTriangle,
  Clock,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import CelebritiesTab from "./components/Celebrities"
import TrendTab from "./components/TrendTab"
import OverviewTab from "./components/OverviewTab"
import AIActionsTab from "./components/AIActionsTab"
import {
  competitorData,
  competitorNotifications,
  sentimentByAge,
  sentimentByGender,
  campaignData,
  randomizeMockData,
} from "./mockData"

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [demographicsModal, setDemographicsModal] = useState<{ open: boolean, campaignName: string | null, data: any }>({ open: false, campaignName: null, data: null })
  const [demographicsLoading, setDemographicsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Function to randomize and update timestamp
  const handleUpdateData = () => {
    randomizeMockData()
    setLastUpdated(new Date())
  }

  // Auto-update every 5 minutes
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleUpdateData()
    }, 60 * 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Helper to fetch demographics for a campaign
  const handleViewDemographics = async (campaignName: string) => {
    setDemographicsLoading(true)
    // Convert campaign name to slug (e.g. "Mexican Chicken Burger" -> "mexican-chicken-burger")
    const slug = campaignName.toLowerCase().replace(/ /g, "-")
    try {
      const res = await fetch(`http://localhost:3000/campaigns/${slug}/sentiments`)
      const json = await res.json()
      setDemographicsModal({
        open: true,
        campaignName,
        data: json.demographics || json.sentimentAnalysis?.demographics || json,
      })
    } catch (e) {
      setDemographicsModal({
        open: true,
        campaignName,
        data: null,
      })
    }
    setDemographicsLoading(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 80) return "bg-green-500"
    if (sentiment >= 70) return "bg-yellow-500"
    if (sentiment >= 60) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Data Refresh Section */}
      <div className="flex items-center gap-4 px-4 py-2 bg-white border-b border-gray-200 text-xs">
        <span className="text-muted-foreground">
          <span className="font-semibold">Last updated:</span>{" "}
          {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </span>
        <Button size="sm" variant="outline" onClick={handleUpdateData}>
          Refresh Data
        </Button>
      </div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">M</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">McDonald's Marketing Analytics</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search campaigns, keywords, or competitors..." className="pl-8" />
            </div>
            <Button variant="outline">Export Report</Button>
            <Button>Create Campaign</Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="celebrities">Promoters</TabsTrigger>
              <TabsTrigger value="ai-action">AI Action Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <TrendTab />
            </TabsContent>

            <TabsContent value="celebrities" className="space-y-6">
              <CelebritiesTab />
            </TabsContent>

            <TabsContent value="ai-action" className="space-y-6">
              <AIActionsTab />
            </TabsContent>
          </Tabs>
        </main>

        {/* Notifications Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Competitor Activity
            </h2>
            <Badge variant="secondary">{competitorNotifications.length}</Badge>
          </div>

          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-4">
              {competitorNotifications.map((notification) => (
                <Card key={notification.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                            {notification.type}
                          </Badge>
                          {notification.priority === "high" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        </div>
                        <h3 className="font-semibold text-sm">{notification.competitor}</h3>
                        <p className="font-medium text-sm text-blue-600">{notification.campaign}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">{notification.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Sentiment</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full ${getSentimentColor(notification.sentiment)}`}
                              style={{ width: `${notification.sentiment}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{notification.sentiment}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Reach</p>
                        <p className="font-medium">{notification.reach}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {notification.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </aside>
      </div>

      {demographicsModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 min-w-[320px] shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setDemographicsModal({ open: false, campaignName: null, data: null })}
            >✕</button>
            <h4 className="text-lg font-bold mb-2">
              Sentiment Demographics for {demographicsModal.campaignName}
            </h4>
            {demographicsModal.data?.byAgeGroup ? (
              <>
                <h5 className="font-semibold mb-2">By Age Group</h5>
                <ul className="mb-4">
                  {Object.entries(demographicsModal.data.byAgeGroup).map(([age, value]) => (
                    <li key={age} className="flex justify-between text-sm py-1">
                      <span className="text-gray-700">{age}</span>
                      <span className="font-medium">{value.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-500">No age group data available.</p>
            )}
            {demographicsModal.data?.byGender && (
              <>
                <h5 className="font-semibold mb-2">By Gender</h5>
                <ul>
                  {Object.entries(demographicsModal.data.byGender).map(([gender, value]) => (
                    <li key={gender} className="flex justify-between text-sm py-1">
                      <span className="capitalize text-gray-700">{gender}</span>
                      <span className="font-medium">{value.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
