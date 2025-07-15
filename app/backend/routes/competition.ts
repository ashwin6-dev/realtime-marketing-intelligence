import { Router } from "express";
import { loadJsonFile } from "../utils/json";
import { COMPETITOR_ACTIVITY, DATA_PATH, OVERALL } from "../constants";
import { summariseCompetitorActivity } from "../bots/competition";

const createCompetitorRouter = () => {
    const router = Router();

    router.get('/activities', async (req, res) => {
        const activities = loadJsonFile(`${DATA_PATH}/${OVERALL}/${COMPETITOR_ACTIVITY}`);
        res.send(await summariseCompetitorActivity(activities));
    });

    return router;
}

export const setupCompetitorsRoute = async (app: any) => {
    const competitorsRouter = createCompetitorRouter();

    app.use('/competitors', competitorsRouter);
}