import { Router } from "express";
import { loadJsonFile } from "../utils/json";
import { PEOPLE, DATA_PATH, OVERALL } from "../constants";
import { determineEmbassdorFit } from "../bots/embassador";

const createEmbassadorRouter = () => {
    const router = Router();

    router.get('/:name/fit', async (req, res) => {
        const acitivities = loadJsonFile(`${DATA_PATH}/${PEOPLE}/${req.params.name}/activity.json`);
        res.send(await determineEmbassdorFit(acitivities));
    })

    return router;
}

export const setupEmbassadorRoute = async (app: any) => {
    const embassadorRouter = createEmbassadorRouter();

    app.use('/embassadors', embassadorRouter);
}