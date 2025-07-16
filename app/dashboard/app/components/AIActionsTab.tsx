"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Lightbulb, TrendingUp, Copy, RefreshCw } from "lucide-react";
import { campaignData, celebrities, competitorData, competitorNotifications, trendingTopics } from "../mockData";
import { GoogleGenAI } from "@google/genai";
import { Badge } from "@/components/ui/badge";

// Init Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

// Define possible actions
const ACTIONS = {
  newCampaigns: {
    label: "New Campaign Ideas",
    icon: <Lightbulb className="w-5 h-5" />,
    prompt: `You are a marketing strategist AI. Given the following data, recommend brand new creative campaign ideas for our brand. Consider current trends, celebrity fit, and competitor activity. Be specific and concise.`
  },
  improvements: {
    label: "Campaign Improvements",
    icon: <TrendingUp className="w-5 h-5" />,
    prompt: `You are a marketing strategist AI. Given the following data, suggest improvements to our existing campaigns. Focus on actionable, creative, and data-driven recommendations.`
  }
};

// Helper to format mock data
const formatDataForPrompt = () => `
Current Campaigns:
${JSON.stringify(campaignData)}

Competitors:
${competitorData.map(c => `- ${c.name} (Sentiment: ${c.sentiment}, Trend: ${c.trend})`).join("\n")}

Current Trends:
${JSON.stringify(trendingTopics)}

Possible Celebrity Collaborations:
${JSON.stringify(celebrities)}

Recent Competitor Activity:
${competitorNotifications.slice(0, 3).map(n => `- ${n.competitor}: ${n.campaign} (${n.type}) - ${n.description}`).join("\n")}

Ensure your output is ONLY an array of JSON objects with a title field, an explanation field, a trends field and a demographic field.
Do NOT wrap your answer in markdown or code block fences. Only return raw JSON text.
`;

// Fetch from Gemini
async function fetchGeminiRecommendation(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemma-3-12b-it",
    contents: prompt,
  });
  return response.text;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

interface Recommendation {
  title: string;
  explanation: string;
  trends?: string[];
  demographic?: { age?: string; gender?: string };
}

export default function AIWidget() {
  const [selectedAction, setSelectedAction] = useState<keyof typeof ACTIONS>("newCampaigns");
  const [results, setResults] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const prompt = `
${ACTIONS[selectedAction].prompt}

${formatDataForPrompt()}
    `;
    try {
      const result = await fetchGeminiRecommendation(prompt);
      console.log(result)
      const parsed = JSON.parse(result);
      setResults(parsed);
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Selector */}
      <div className="flex gap-2">
        {Object.entries(ACTIONS).map(([key, action]) => (
          <Button
            key={key}
            onClick={() => setSelectedAction(key as keyof typeof ACTIONS)}
            variant={selectedAction === key ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>

      {/* Unified Card */}
      <Card className="border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              {ACTIONS[selectedAction].icon}
            </div>
            <div>
              <CardTitle className="text-xl">{ACTIONS[selectedAction].label}</CardTitle>
              <CardDescription>AI-generated insights</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Generate button */}
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {ACTIONS[selectedAction].icon}
                <span>Generate</span>
              </div>
            )}
          </Button>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded animate-pulse w-1/2"></div>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(results, null, 2))}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleGenerate}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {results.map((item, idx) => (
                  <Card key={idx} className="border border-blue-100 bg-white/80 backdrop-blur-sm p-4 rounded-xl space-y-2">
                    <h4 className="font-semibold text-blue-700">{item.title}</h4>
                    <p className="text-sm text-gray-700 mb-2">{item.explanation}</p>
                    {item.trends && Array.isArray(item.trends) && item.trends.length > 0 && (
                      <div className="mb-2">
                        <span className="font-semibold text-purple-700">Trends:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.trends.map((trend, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{trend}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.demographic && (item.demographic.age || item.demographic.gender) && (
                      <div>
                        <span className="font-semibold text-green-700">Target Demographic:</span>
                        <div className="flex gap-2 mt-1">
                          {item.demographic.age && (
                            <Badge variant="outline" className="text-xs">{item.demographic.age}</Badge>
                          )}
                          {item.demographic.gender && (
                            <Badge variant="outline" className="text-xs capitalize">{item.demographic.gender}</Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && results.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Choose an action and click generate to see AI-powered results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
