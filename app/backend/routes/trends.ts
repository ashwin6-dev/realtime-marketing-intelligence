import { Router } from "express";
import { TrendInsightService } from "../services/trendInsightService";

const createTrendsRouter = (trendInsightService: TrendInsightService) => {
    const router = Router();

    router.get('/', async (req, res) => { 
        const results = await trendInsightService.getKeywordDemographicInsights();
        res.send(results);
    })

    return router;
}

export const setupTrendsRoute = (app: any) => {
    const trendInsightService = TrendInsightService.create();
    const router = createTrendsRouter(trendInsightService);

    app.use('/trends', router);
}
