import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Technician } from "./map/maprender";


export default class API {
    axiosInstance : AxiosInstance;
    static instance;

    static getInstance() : API {
        if(API.instance == null) {
            API.instance = new API();
        }
        return API.instance;
    }

    constructor() 
    {
        this.axiosInstance = axios.create({
            baseURL: "http://localhost:4000/",
            timeout: 1000
        });
    }

    async getTechnicians(solarFarmId : number) {
        try {
            const res : AxiosResponse = await this.axiosInstance.get(`/api/v1/solar_farms/${solarFarmId}/technicians`);
            return res.data;
        } catch(error) {
            throw error.response.data.errors[0];
        }
    }

    async randomizeTechnicianPositions(solarFarmId : number, techs : Technician[]) {
        let minMaxLong : number[] = [10000, -10000];
        let minMaxLat : number[] = [10000, -10000];
        for(const ind in techs) {
            let coordinates = techs[ind].coordinates;
            minMaxLong[0] = Math.min(minMaxLong[0], coordinates[0]);
            minMaxLong[1] = Math.max(minMaxLong[1], coordinates[0]);
            minMaxLat[0] = Math.min(minMaxLat[0], coordinates[1]);
            minMaxLat[1] = Math.max(minMaxLat[1], coordinates[1]);
        }   
        for(const ind in techs) {
            techs[ind].coordinates = [this.randomFloat(minMaxLong[0], minMaxLong[1]), this.randomFloat(minMaxLat[0], minMaxLat[1])];
        }   
        return await this.updateTechnicians(solarFarmId, techs);
    }

    async updateTechnicians(solarFarmId : number, techs : Technician[]) {
        const res : AxiosResponse = await this.axiosInstance.post(`/api/v1/solar_farms/${solarFarmId}/techniciansMoved`, JSON.stringify(techs), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }

    randomFloat(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}