import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // use shadcn badge instead of lucide-react
import { trendingTopics } from "../mockData";

const TrendTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Keywords & Topics</CardTitle>
        <CardDescription>Hot topics driving engagement and virality</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{topic.keyword}</p>
                <p className="text-sm text-muted-foreground">
                  {topic.mentions.toLocaleString()} mentions
                </p>
                <p className="text-xs text-muted-foreground">
                  Popular with: ages {topic.popularWith.age}, {topic.popularWith.gender}
                </p>
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
  );
};

export default TrendTab;
