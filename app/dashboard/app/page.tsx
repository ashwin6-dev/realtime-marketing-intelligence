"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  TrendingUp,
  Users,
  Heart,
  Target,
  ThumbsUp,
  MessageSquare,
  Share2,
  AlertTriangle,
  Clock,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import CampaignCard from "./components/CampaignCard"

// Mock data
const campaignData = [
  {
    id: 1,
    name: "McPlant Burger",
    sentiment: 72,
    reach: "2.4M",
    engagement: "156K",
    mentions: 8420,
    trend: "+12%",
    competitorSentiments: [
      { name: "Burger King", sentiment: 68, campaign: "Impossible Whopper 2.0" },
      { name: "KFC", sentiment: 65, campaign: "Plant-Based Test" },
      { name: "Subway", sentiment: 58, campaign: "Veggie Delite" },
    ],
  },
  {
    id: 2,
    name: "Mexican Chicken Burger",
    sentiment: 89,
    reach: "15.2M",
    engagement: "892K",
    mentions: 45230,
    trend: "+45%",
    competitorSentiments: [
      { name: "Burger King", sentiment: 72, campaign: "Whopper Wednesday" },
      { name: "Taco Bell", sentiment: 79, campaign: "Nacho Fries Return" },
      { name: "KFC", sentiment: 68, campaign: "Celebrity Bucket" },
    ],
  },
  {
    id: 3,
    name: "Spicy Chicken McNuggets",
    sentiment: 81,
    reach: "5.1M",
    engagement: "324K",
    mentions: 12840,
    trend: "+8%",
    competitorSentiments: [
      { name: "KFC", sentiment: 84, campaign: "Hot Wings" },
      { name: "Burger King", sentiment: 71, campaign: "Spicy Chicken" },
      { name: "Taco Bell", sentiment: 76, campaign: "Diablo Sauce" },
    ],
  },
]

const competitorData = [
  { name: "Burger King", sentiment: 68, mentions: 15420, trend: "-3%" },
  { name: "KFC", sentiment: 74, mentions: 12890, trend: "+5%" },
  { name: "Subway", sentiment: 71, mentions: 9340, trend: "+2%" },
  { name: "Taco Bell", sentiment: 79, mentions: 18750, trend: "+15%" },
]

const competitorNotifications = [
  {
    id: 1,
    competitor: "Burger King",
    campaign: "Whopper Wednesday",
    type: "New Campaign",
    time: "2 hours ago",
    description:
      "Launched weekly discount campaign targeting price-conscious consumers. Heavy promotion on TikTok and Instagram.",
    sentiment: 72,
    reach: "1.2M",
    priority: "high",
    tags: ["discount", "weekly-promo", "social-media"],
  },
  {
    id: 2,
    competitor: "Taco Bell",
    campaign: "Nacho Fries Return",
    type: "Product Launch",
    time: "6 hours ago",
    description:
      "Bringing back popular limited-time item with celebrity endorsement from Doja Cat. Strong Gen Z engagement.",
    sentiment: 89,
    reach: "3.8M",
    priority: "high",
    tags: ["limited-time", "celebrity", "gen-z"],
  },
  {
    id: 3,
    competitor: "KFC",
    campaign: "Plant-Based Chicken Test",
    type: "Market Test",
    time: "1 day ago",
    description: "Testing plant-based chicken alternatives in select markets. Targeting health-conscious millennials.",
    sentiment: 65,
    reach: "890K",
    priority: "medium",
    tags: ["plant-based", "test-market", "health"],
  },
  {
    id: 4,
    competitor: "Subway",
    campaign: "Fresh Forward Rebrand",
    type: "Brand Campaign",
    time: "2 days ago",
    description: "Major rebranding effort emphasizing fresh ingredients and customization. Mixed reception so far.",
    sentiment: 58,
    reach: "2.1M",
    priority: "medium",
    tags: ["rebrand", "fresh", "customization"],
  },
  {
    id: 5,
    competitor: "Burger King",
    campaign: "Impossible Whopper 2.0",
    type: "Product Update",
    time: "3 days ago",
    description: "Updated recipe for plant-based burger with improved taste. Competing directly with McPlant.",
    sentiment: 76,
    reach: "1.8M",
    priority: "high",
    tags: ["plant-based", "recipe-update", "direct-competitor"],
  },
]

const sentimentByAge = [
  { age: "13-17", positive: 85, neutral: 10, negative: 5 },
  { age: "18-24", positive: 78, neutral: 15, negative: 7 },
  { age: "25-34", positive: 72, neutral: 20, negative: 8 },
  { age: "35-44", positive: 68, neutral: 25, negative: 7 },
  { age: "45-54", positive: 65, neutral: 28, negative: 7 },
  { age: "55+", positive: 62, neutral: 30, negative: 8 },
]

const sentimentByGender = [
  { name: "Male", value: 76, color: "#3b82f6" },
  { name: "Female", value: 81, color: "#ec4899" },
  { name: "Non-binary", value: 79, color: "#10b981" },
]

const trendingTopics = [
  { keyword: "#McPlantBurger", mentions: 45200, growth: "+234%", sentiment: 72 },
  { keyword: "sustainable food", mentions: 28900, growth: "+156%", sentiment: 84 },
  { keyword: "plant-based", mentions: 67800, growth: "+89%", sentiment: 78 },
  { keyword: "fast food health", mentions: 34500, growth: "+67%", sentiment: 65 },
  { keyword: "#TravisScottMeal", mentions: 89200, growth: "+45%", sentiment: 89 },
]

const celebrities = [
  {
    name: "Zendaya",
    score: 92,
    image: "/placeholder.svg?height=40&width=40",
    followers: "103M",
    engagement: "8.2%",
    brandFit: "Excellent alignment with young demographics and sustainability values",
    demographics: "18-24: 45%, 25-34: 30%",
  },
  {
    name: "Ryan Reynolds",
    score: 87,
    image: "/placeholder.svg?height=40&width=40",
    followers: "47M",
    engagement: "6.8%",
    brandFit: "Strong humor appeal, broad demographic reach",
    demographics: "25-34: 35%, 35-44: 28%",
  },
  {
    name: "Lizzo",
    score: 84,
    image: "/placeholder.svg?height=40&width=40",
    followers: "13M",
    engagement: "9.1%",
    brandFit: "High engagement, positive body image messaging",
    demographics: "18-24: 40%, 25-34: 32%",
  },
  {
    name: "Gordon Ramsay",
    score: 79,
    image: "/placeholder.svg?height=40&width=40",
    followers: "32M",
    engagement: "5.4%",
    brandFit: "Food expertise, but potential brand conflict with fine dining image",
    demographics: "25-34: 30%, 35-44: 35%",
  },
]

const weeklyTrends = [
  { week: "Week 1", mentions: 12400, sentiment: 74 },
  { week: "Week 2", mentions: 15600, sentiment: 76 },
  { week: "Week 3", mentions: 18900, sentiment: 78 },
  { week: "Week 4", mentions: 22300, sentiment: 81 },
  { week: "Week 5", mentions: 19800, sentiment: 79 },
  { week: "Week 6", mentions: 25100, sentiment: 83 },
]

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [demographicsModal, setDemographicsModal] = useState<{ open: boolean, campaignName: string | null, data: any }>({ open: false, campaignName: null, data: null })
  const [demographicsLoading, setDemographicsLoading] = useState(false)

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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="celebrities">Celebrities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">22.7M</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Sentiment</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">2 performing above target</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Trending Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-muted-foreground">+12 from last week</p>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Performance with Competitor Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance vs Competitors</CardTitle>
                  <CardDescription>How our campaigns stack up against competitor campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {campaignData.map((campaign) => (
                    <CampaignCard campaign={campaign} key={campaign.id} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Keywords & Topics</CardTitle>
                  <CardDescription>Hot topics driving engagement and virality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{topic.keyword}</p>
                          <p className="text-sm text-muted-foreground">{topic.mentions.toLocaleString()} mentions</p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge variant="outline" className="text-green-600">
                            {topic.growth}
                          </Badge>
                          <p className="text-sm">Sentiment: {topic.sentiment}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Viral Content Drivers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Sustainability messaging (+234% growth)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Celebrity collaborations (+156% growth)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Limited-time offers (+89% growth)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Health-conscious options (+67% growth)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Demographic Drivers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gen Z (13-24)</span>
                        <span className="text-sm font-medium">45% of viral content</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Millennials (25-40)</span>
                        <span className="text-sm font-medium">32% of viral content</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gen X (41-56)</span>
                        <span className="text-sm font-medium">18% of viral content</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Boomers (57+)</span>
                        <span className="text-sm font-medium">5% of viral content</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="celebrities" className="space-y-6">
              <div className="grid gap-4">
                {celebrities.map((celebrity, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={celebrity.image || "/placeholder.svg"} alt={celebrity.name} />
                          <AvatarFallback>
                            {celebrity.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{celebrity.name}</CardTitle>
                          <CardDescription>
                            {celebrity.followers} followers • {celebrity.engagement} engagement rate
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600">{celebrity.score}</div>
                          <p className="text-sm text-muted-foreground">Brand Fit Score</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Brand Fit Analysis</h4>
                          <p className="text-sm text-muted-foreground">{celebrity.brandFit}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Audience Demographics</h4>
                          <p className="text-sm text-muted-foreground">{celebrity.demographics}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>High Engagement</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>Authentic Voice</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="w-4 h-4" />
                            <span>Viral Potential</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="h-3 rounded-full bg-green-500" style={{ width: `${celebrity.score}%` }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
