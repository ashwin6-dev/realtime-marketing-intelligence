import { useState } from "react";
import DemographicsModal from "./DemographicsModal";
import { Button } from "@/components/ui/button";

export default function CampaignCard({ campaign }) {
    const [showModal, setShowModal] = useState(false);
    const [demographics, setDemographics] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleViewDemographics = async () => {
        setLoading(true);
        const slug = campaign.name.toLowerCase().replace(/ /g, "-");
        try {
            const res = await fetch(`http://localhost:3000/campaigns/${slug}/sentiments`);
            const json = await res.json();
            setDemographics(json.demographics || json.sentimentAnalysis?.demographics || json);
        } catch {
            setDemographics(null);
        }
        setShowModal(true);
        setLoading(false);
    };

    const getSentimentColor = (sentiment: number) => {
        if (sentiment >= 80) return "bg-green-500"
        if (sentiment >= 70) return "bg-yellow-500"
        if (sentiment >= 60) return "bg-orange-500"
        return "bg-red-500"
    }

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-white">
            <div key={campaign.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold">{campaign.name}</h3>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={loading}
                            onClick={() => handleViewDemographics(campaign.name)}
                        >
                            {loading
                                ? "Loading..."
                                : "View Demographics"}
                        </Button>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Reach: {campaign.reach}</p>
                        <p className="text-sm text-green-600">{campaign.trend}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                        <h4 className="font-medium">McDonald's Sentiment</h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Our Campaign</span>
                                <span className="text-sm font-bold">{campaign.sentiment}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full ${getSentimentColor(campaign.sentiment)}`}
                                    style={{ width: `${campaign.sentiment}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium">Competitor Comparison</h4>
                        <div className="space-y-2">
                            {campaign.competitorSentiments.map((comp, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            {comp.name} - {comp.campaign}
                                        </span>
                                        <span className="text-xs font-medium">{comp.sentiment}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${getSentimentColor(comp.sentiment)}`}
                                            style={{ width: `${comp.sentiment}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 pt-2 border-t">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-lg font-bold">{campaign.engagement}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Mentions</p>
                        <p className="text-lg font-bold">{campaign.mentions.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Trend</p>
                        <p className="text-lg font-bold text-green-600">{campaign.trend}</p>
                    </div>
                </div>

            </div>
            {showModal && (
                <DemographicsModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    campaignName={campaign.name}
                    data={demographics}
                />
            )}
        </div>
    );
}