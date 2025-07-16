import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ThumbsUp,
  MessageSquare,
  Share2 } from 'lucide-react';
import { celebrities } from "../mockData";
  
const CelebritiesTab = () => {
    return (
        <>
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
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="h-3 rounded-full bg-green-500" style={{ width: `${celebrity.score}%` }}></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default CelebritiesTab;