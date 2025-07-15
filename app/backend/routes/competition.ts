import { Router } from "express";
import { loadJsonFile } from "../utils/json";
import { COMPETITOR_ACTIVITY, DATA_PATH, OVERALL } from "../constants";
import { summariseCompetitorActivity } from "../bots/competition";

const createCompetitorRouter = () => {
    const router = Router();

    router.get('/activities', async (req, res) => {
        const acitivities = loadJsonFile(`${DATA_PATH}/${OVERALL}/${COMPETITOR_ACTIVITY}`);
        res.send();
    });

    return router;
}

export const setupCompetitorsRoute = async (app: any) => {
    const competitorsRouter = createCompetitorRouter();

    app.use('/competitors', competitorsRouter);
}