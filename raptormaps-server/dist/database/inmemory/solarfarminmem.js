"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);
class InMemSolarFarms {
    constructor() {
        this.solarFarms = {};
    }
    readFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield readFilePromise('api_techician_response_data.json');
            const parsed = JSON.parse(data);
            this.solarFarms = { 1: {
                    currentTechnicians: parsed,
                    id: 1,
                    technicianId: parsed[parsed.length - 1].features[0].properties.id
                } };
        });
    }
    getSolarFarm(solarFarmId) {
        return this.solarFarms[solarFarmId];
    }
    getTechnicians(solarFarmId) {
        if (!this.solarFarms[solarFarmId])
            return null;
        const technicians = this.solarFarms[solarFarmId].currentTechnicians;
        const features = technicians[technicians.length - 1];
        return features;
    }
    techniciansMoved(solarFarmId, features) {
        if (this.solarFarms[solarFarmId]) {
            this.solarFarms[solarFarmId].currentTechnicians.push(features);
            this.solarFarms[solarFarmId].technicianId++;
        }
        else {
            this.solarFarms[solarFarmId] = { currentTechnicians: [features], id: 1, technicianId: 1 };
        }
    }
}
exports.default = InMemSolarFarms;
//# sourceMappingURL=solarfarminmem.js.map