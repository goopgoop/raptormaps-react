import { Features } from "../entities/Features";
import { SolarFarm } from "../entities/SolorFarm";

const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

export default class InMemSolarFarms {
    solarFarms : Record<string, SolarFarm>;

    constructor() {
        this.solarFarms = {};
    }

    async readFile() {
        const data = await readFilePromise('api_techician_response_data.json');
        const parsed : Features[] = JSON.parse(data);
        this.solarFarms = {1 : {
            currentTechnicians: parsed,
            id: 1,
            technicianId: parsed[parsed.length - 1].features[0].properties.id
        }};
    }

    getSolarFarm(solarFarmId : string) {
        return this.solarFarms[solarFarmId];
    }

    getTechnicians(solarFarmId : string) : Features {
        if(!this.solarFarms[solarFarmId])
            return null;
        const technicians = this.solarFarms[solarFarmId].currentTechnicians;
        const features : Features = technicians[technicians.length - 1];
        return features;
    }

    techniciansMoved(solarFarmId : string, features : Features) {
        if(this.solarFarms[solarFarmId]) {
            this.solarFarms[solarFarmId].currentTechnicians.push(features);
            this.solarFarms[solarFarmId].technicianId++;
        }
        else {
            this.solarFarms[solarFarmId] = {currentTechnicians: [features], id: 1, technicianId: 1};
        }
    }
}