import { Router } from "express";
import { SentimentService } from "../services/sentimentService";


const createCampaignsRouter = (sentimentService: SentimentService) => {
    const router = Router();

    router.get('/', (req, res) => res.send('Campaigns route'));

    router.get('/:campaign/sentiments', async (req, res) => {
        const result = await sentimentService.analyseSentiment(req.params.campaign);
        res.send(result);
    });

    router.get('/:campaign/seo', (req, res) => {});

    return router;
}

export const setupCampaignsRoute = async (app: any) => {
    const sentimentService = await SentimentService.create();
    const campaignRouter = createCampaignsRouter(sentimentService);

    app.use('/campaigns', campaignRouter);
}