import express from "express";
import cors from "cors";

import { setupCampaignsRoute } from './routes/campaigns';
import { setupTrendsRoute } from "./routes/trends";
import { setupCompetitorsRoute } from "./routes/competition";
import { setupEmbassadorRoute } from "./routes/embassador";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const start = async () => {
    await setupCampaignsRoute(app);
    await setupTrendsRoute(app);
    await setupCompetitorsRoute(app);
    await setupEmbassadorRoute(app);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}


start();