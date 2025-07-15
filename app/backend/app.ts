import express from "express";
import cors from "cors";

import { setupCampaignsRoute } from './routes/campaigns';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const start = async () => {
    await setupCampaignsRoute(app);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}


start();