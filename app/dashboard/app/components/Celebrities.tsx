import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { celebrities, celebrityScoreOptions, celebrityBrandFitOptions } from "../mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Helper to randomize a new celebrity
function createRandomCelebrity(name: string) {
  const idx = Math.floor(Math.random() * celebrityScoreOptions.length);
  const followers = `${Math.floor(Math.random() * 100 + 1)}M`;
  const engagement = `${(Math.random() * 10).toFixed(1)}%`;
  return {
    name,
    score: celebrityScoreOptions[idx],
    image: "/placeholder.svg?height=40&width=40",
    followers,
    engagement,
    brandFit: `${name} ${celebrityBrandFitOptions[idx % celebrityBrandFitOptions.length]}`,
    demographics: "18-24: 40%, 25-34: 30%",
  };
}

const CelebritiesTab = () => {
  const [open, setOpen] = useState(false);
  const [inputName, setInputName] = useState("");

  const handleAdd = () => {
    if (inputName.trim().length > 0) {
      celebrities.push(createRandomCelebrity(inputName.trim()));
      setInputName("");
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Person to Watchlist</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter name"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
            autoFocus
          />
          <DialogFooter>
            <Button onClick={handleAdd} disabled={!inputName.trim()}>Add</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid gap-4">
        <div>
          <Button onClick={() => setOpen(true)}>Add New Person to Watchlist</Button>
        </div>
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