import axios from 'axios';
import { stringify } from 'querystring';

export default class PlacesService {
    
    max: number = 20;
    min: number = 0;
    randIndex: number = 0;

    constructor() {

    }

    async getRandomNearbyPlace(req: any, res: any) {

        const randIndex: number = Math.floor(Math.random() * (20 - 0) + 0);

        const url: string = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`
        + `location=${req.params.latitude},${req.params.longitude}`
        + `&radius=${req.params.radius}`
        + `&type=restaurant`
        + `&key=${process.env.GAPI_KEY as string}`;

        try {
            const response = await axios.get(url);

            console.log(`Random index ${randIndex}`)
            console.log(JSON.stringify(response.data.results[randIndex]));
            res.status(200).send(response.data.results[randIndex]);
        } catch (error) {
            console.log(stringify(error));
            res.status(500).send(error);
        }
    }
}