import {Arg, Mutation, Query, Resolver} from "type-graphql"
import { Feature } from "../entities/Feature";
import { Features } from "../entities/Features";
import {  SolarFarm } from "../entities/SolorFarm";
import { TechnicianInput } from "../entities/types/techinicaninput";
import { FeaturesResponse } from "../responseTypes";
import InMemSolarFarms from "./solarfarminmem";

var database : InMemSolarFarms;

@Resolver() 
export class DatabaseResolver {
    @Query(() => FeaturesResponse) 
    async technicians(@Arg("SolarFarmId", () => String) solarFarmId : string) : Promise<FeaturesResponse | null> {
        const technicians : Features = database.getTechnicians(solarFarmId);

        if(!technicians)
            return {errors: ["Solar farm id not found"]};
        return {response: technicians};
    }

    @Mutation(() => FeaturesResponse) 
    async techniciansMoved(
        @Arg("SolarFarmId", () => String) solarFarmId : string, 
        @Arg("Technicians", () => [TechnicianInput]) techs : [TechnicianInput]) : Promise<FeaturesResponse | null> {
        
        const solarFarm : SolarFarm = database.getSolarFarm(solarFarmId);

        const techId = solarFarm.technicianId + 1;
        let features : Feature[] = [];
        for(let i = 0; i < techs.length; i++) {
            let tech = techs[i];
            features.push({
                type: "Feature",
                properties: {...tech, id: techId, tsecs: new Date()},
                geometry: {type: "Point", coordinates: tech.coordinates}
            });
        }
       
        database.techniciansMoved(solarFarmId, {features: features});
        return {response: database.getTechnicians(solarFarmId)};
    }  
}

export async function connectToDB() {
    database = new InMemSolarFarms();
    await database.readFile();
}