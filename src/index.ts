import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import PlacesService from "./services/places.service";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
const places = new PlacesService();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/nearbyFood/:radius/:latitude/:longitude', places.getRandomNearbyPlace);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});