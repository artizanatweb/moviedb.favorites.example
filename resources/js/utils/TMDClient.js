import axios from "axios";

class TMDClient {
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.MIX_MOVIEDB_API,
        });

        this.setApiKey();
    }

    setApiKey() {
        this.instance.interceptors.request.use((config) => {
            config.params = config.params || {};
            config.params['api_key'] = process.env.MIX_MOVIEDB_KEY;

            return config;
        }, (error) => {
            console.log("[TMD] request error: ", error);
            return Promise.reject(error);
        });
    }

    getInstance() {
        return this.instance;
    }
}

export default new TMDClient();
