// --- Static Data (never randomized) ---
export const celebrities = [
  {
    name: "Rohit Sharma",
    score: 92,
    image: "/placeholder.svg?height=40&width=40",
    followers: "103M",
    engagement: "8.2%",
    brandFit: "Rohit Sharma is an excellent potential brand ambassador for McDonald's. His activity shows consistent and enthusiastic engagement with the brand, highlighting a variety of menu items (Grilled Chicken Wrap, Happy Meals, McSpicy Paneer, coffee, McAloo Tikki, Spicy Chicken Nuggets). He frequently mentions enjoying McDonald's with his family, which aligns well with McDonald's appeal to families. The high engagement (likes and comments) on his posts demonstrates a positive audience response. As a popular figure in India, his endorsement would likely resonate strongly with the target demographic. His posts also showcase a range of menu items, appealing to different tastes and preferences, which is beneficial for McDonald's.",
    demographics: "18-24: 45%, 25-34: 30%",
  },
  {
    name: "Aamir Khan",
    score: 15,
    image: "/placeholder.svg?height=40&width=40",
    followers: "47M",
    engagement: "6.8%",
    brandFit: "Aamir Khan's online activity consistently promotes sustainable food practices, reducing fast food consumption, and highlights the negative impacts of processed foods. This directly contradicts McDonald's brand image as a fast-food provider. While he is a respected figure, his advocacy for alternatives makes him a poor brand fit. His focus on local, organic, and unprocessed foods is fundamentally opposed to McDonald's core business.",
    demographics: "25-34: 35%, 35-44: 28%",
  },
];

// --- Randomizable Options ---
const sentimentOptions = [65, 72, 81, 89, 74, 68, 79];
const reachOptions = ["2.4M", "5.1M", "15.2M", "3.8M", "1.2M", "890K", "2.1M", "1.8M"];
const engagementOptions = ["156K", "324K", "892K", "120K", "450K"];
const mentionsOptions = [8420, 12840, 45230, 15420, 9340, 18750, 67200, 48900, 90200, 40500];
const trendOptions = ["+12%", "+8%", "+45%", "-3%", "+15%", "+160%", "+120%", "+95%", "+80%"];
const priorityOptions = ["high", "medium"];
const tagsOptions = [
  ["discount", "weekly-promo", "social-media"],
  ["limited-time", "celebrity", "gen-z"],
  ["plant-based", "test-market", "health"],
  ["rebrand", "fresh", "customization"],
  ["plant-based", "recipe-update", "direct-competitor"],
];
const competitorSentimentsOptions = [
  [
    { name: "Burger King", sentiment: 68, campaign: "Impossible Whopper 2.0" },
    { name: "KFC", sentiment: 65, campaign: "Plant-Based Test" },
    { name: "Subway", sentiment: 58, campaign: "Veggie Delite" },
  ],
  [
    { name: "Burger King", sentiment: 72, campaign: "Whopper Wednesday" },
    { name: "Taco Bell", sentiment: 79, campaign: "Nacho Fries Return" },
    { name: "KFC", sentiment: 68, campaign: "Celebrity Bucket" },
  ],
  [
    { name: "KFC", sentiment: 84, campaign: "Hot Wings" },
    { name: "Burger King", sentiment: 71, campaign: "Spicy Chicken" },
    { name: "Taco Bell", sentiment: 76, campaign: "Diablo Sauce" },
  ],
];
const demographicsOptions = [
  {
    byAgeGroup: {
      "13-17": 68.3,
      "18-24": 74.1,
      "25-34": 81.5,
      "35-44": 77.2,
      "45-54": 69.8,
      "55-64": 65.4,
      "65+": 60.9,
    },
    byGender: {
      male: 75.6,
      female: 79.3,
    },
  },
  {
    byAgeGroup: {
      "13-17": 72.1,
      "18-24": 78.5,
      "25-34": 85.2,
      "35-44": 80.3,
      "45-54": 73.9,
      "55-64": 68.2,
      "65+": 63.5,
    },
    byGender: {
      male: 78.2,
      female: 82.1,
    },
  },
  {
    byAgeGroup: {
      "13-17": 65.0,
      "18-24": 70.0,
      "25-34": 75.0,
      "35-44": 72.0,
      "45-54": 68.0,
      "55-64": 62.0,
      "65+": 58.0,
    },
    byGender: {
      male: 70.0,
      female: 75.0,
    },
  },
];

// --- Trending Topics Options ---
const trendingTopicsOptions = [
  [
    {
      keyword: "#AIArt",
      mentions: 75200,
      growth: "+190%",
      sentiment: 82,
      popularWith: { age: "18-24", gender: "male" }
    },
    {
      keyword: "#SustainableFashion",
      mentions: 48900,
      growth: "+160%",
      sentiment: 88,
      popularWith: { age: "25-34", gender: "female" }
    },
    {
      keyword: "Virtual Reality",
      mentions: 90200,
      growth: "+120%",
      sentiment: 74,
      popularWith: { age: "18-24", gender: "male" }
    },
    {
      keyword: "Digital Nomad",
      mentions: 40500,
      growth: "+95%",
      sentiment: 79,
      popularWith: { age: "25-34", gender: "female" }
    },
    {
      keyword: "#PetInfluencers",
      mentions: 67200,
      growth: "+80%",
      sentiment: 91,
      popularWith: { age: "18-24", gender: "female" }
    },
  ],
  [
    {
      keyword: "#EcoTravel",
      mentions: 54000,
      growth: "+140%",
      sentiment: 85,
      popularWith: { age: "25-34", gender: "female" }
    },
    {
      keyword: "#PlantBased",
      mentions: 61000,
      growth: "+110%",
      sentiment: 80,
      popularWith: { age: "18-24", gender: "female" }
    },
    {
      keyword: "#CryptoGaming",
      mentions: 72000,
      growth: "+170%",
      sentiment: 77,
      popularWith: { age: "18-24", gender: "male" }
    },
    {
      keyword: "#HomeCafe",
      mentions: 33000,
      growth: "+90%",
      sentiment: 90,
      popularWith: { age: "25-34", gender: "female" }
    },
    {
      keyword: "#PetFitness",
      mentions: 41000,
      growth: "+85%",
      sentiment: 93,
      popularWith: { age: "18-24", gender: "female" }
    },
  ],
  [
    {
      keyword: "#SmartWearables",
      mentions: 80000,
      growth: "+200%",
      sentiment: 83,
      popularWith: { age: "25-34", gender: "male" }
    },
    {
      keyword: "#ZeroWaste",
      mentions: 47000,
      growth: "+130%",
      sentiment: 87,
      popularWith: { age: "25-34", gender: "female" }
    },
    {
      keyword: "#FoodHacks",
      mentions: 65000,
      growth: "+150%",
      sentiment: 79,
      popularWith: { age: "18-24", gender: "male" }
    },
    {
      keyword: "#RemoteWork",
      mentions: 52000,
      growth: "+100%",
      sentiment: 81,
      popularWith: { age: "25-34", gender: "female" }
    },
    {
      keyword: "#PetRescue",
      mentions: 39000,
      growth: "+75%",
      sentiment: 95,
      popularWith: { age: "18-24", gender: "female" }
    },
  ],
];

// --- Helper for random selection ---
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Exported trendingTopics (default) ---
export let trendingTopics = trendingTopicsOptions[0];

// --- Campaigns: Always same names, but values can be randomized ---
export let campaignData = [
  {
    id: 1,
    name: "McPlant Burger",
    sentiment: 72,
    reach: "2.4M",
    engagement: "156K",
    mentions: 8420,
    trend: "+12%",
    competitorSentiments: competitorSentimentsOptions[0],
    demographics: demographicsOptions[0],
  },
  {
    id: 2,
    name: "Mexican Chicken Burger",
    sentiment: 89,
    reach: "15.2M",
    engagement: "892K",
    mentions: 45230,
    trend: "+45%",
    competitorSentiments: competitorSentimentsOptions[1],
    demographics: demographicsOptions[1],
  },
  {
    id: 3,
    name: "Spicy Chicken McNuggets",
    sentiment: 81,
    reach: "5.1M",
    engagement: "324K",
    mentions: 12840,
    trend: "+8%",
    competitorSentiments: competitorSentimentsOptions[2],
    demographics: demographicsOptions[2],
  },
];

// --- Competitor Data ---
export let competitorData = [
  { name: "Burger King", sentiment: 68, mentions: 15420, trend: "-3%" },
  { name: "KFC", sentiment: 74, mentions: 12890, trend: "+5%" },
  { name: "Subway", sentiment: 71, mentions: 9340, trend: "+2%" },
  { name: "Taco Bell", sentiment: 79, mentions: 18750, trend: "+15%" },
];

// --- Competitor Notifications ---
export let competitorNotifications = [
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
];

// --- Sentiment By Age ---
export let sentimentByAge = [
  { age: "13-17", positive: 85, neutral: 10, negative: 5 },
  { age: "18-24", positive: 78, neutral: 15, negative: 7 },
  { age: "25-34", positive: 72, neutral: 20, negative: 8 },
  { age: "35-44", positive: 68, neutral: 25, negative: 7 },
  { age: "45-54", positive: 65, neutral: 28, negative: 7 },
  { age: "55+", positive: 62, neutral: 30, negative: 8 },
];

// --- Sentiment By Gender ---
export let sentimentByGender = [
  { name: "Male", value: 76, color: "#3b82f6" },
  { name: "Female", value: 81, color: "#ec4899" },
  { name: "Non-binary", value: 79, color: "#10b981" },
];

// --- Randomize All Mock Data (except celebrities) ---
export function randomizeMockData() {
  // Campaigns
  campaignData = campaignData.map((campaign, idx) => ({
    ...campaign,
    sentiment: pickRandom(sentimentOptions),
    reach: pickRandom(reachOptions),
    engagement: pickRandom(engagementOptions),
    mentions: pickRandom(mentionsOptions),
    trend: pickRandom(trendOptions),
    competitorSentiments: pickRandom(competitorSentimentsOptions),
    demographics: pickRandom(demographicsOptions),
  }));

  // Competitor Data
  competitorData = competitorData.map((c) => ({
    ...c,
    sentiment: pickRandom(sentimentOptions),
    mentions: pickRandom(mentionsOptions),
    trend: pickRandom(trendOptions),
  }));

  // Trending Topics: pick a random set
  trendingTopics = pickRandom(trendingTopicsOptions);

  // Competitor Notifications
  competitorNotifications = competitorNotifications.map((n, idx) => ({
    ...n,
    sentiment: pickRandom(sentimentOptions),
    reach: pickRandom(reachOptions),
    priority: pickRandom(priorityOptions),
    tags: pickRandom(tagsOptions),
  }));

  // Sentiment By Age
  sentimentByAge = sentimentByAge.map((row) => ({
    ...row,
    positive: pickRandom([62, 65, 68, 72, 78, 81, 85]),
    neutral: pickRandom([10, 15, 20, 25, 28, 30]),
    negative: pickRandom([5, 7, 8]),
  }));

  // Sentiment By Gender
  sentimentByGender = sentimentByGender.map((row) => ({
    ...row,
    value: pickRandom([70, 75, 76, 78, 81, 85]),
  }));
}
