import { mongoose } from "@typegoose/typegoose";
import {Arg, Mutation, Query, Resolver} from "type-graphql"
import { Feature } from "../entities/Feature";
import { Features } from "../entities/Features";
import { SolarFarmModal } from "../entities/SolorFarm";
import { TechnicianInput } from "../entities/types/techinicaninput";
import { FeaturesResponse } from "../responseTypes";

@Resolver() 
export class DatabaseResolver {
    @Query(() => FeaturesResponse) 
    async technicians(@Arg("SolarFarmId", () => String) solarFarmId : string) : Promise<FeaturesResponse | null> {
        let solarFarm = await SolarFarmModal.findOne({id: solarFarmId}, {currentTechnicians: {$slice: -1}});
        if(!solarFarm)
            return {errors: ["Solar Farm Id not found"]};
        return {response: solarFarm.currentTechnicians[0]};
    }

    @Mutation(() => FeaturesResponse) 
    async techniciansMoved(
        @Arg("SolarFarmId", () => String) solarFarmId : string, 
        @Arg("Technicians", () => [TechnicianInput]) techs : [TechnicianInput]): Promise<FeaturesResponse | null> {
        let {technicianId} = await SolarFarmModal.findOneAndUpdate(
            {id: solarFarmId}, {$inc: { technicianId: 1 }, $setOnInsert: { currentTechnicians: [] }}, { upsert: true, new: true, setDefaultsOnInsert: true } 
        );

        let newFeatures : Feature[] = [];
        for(let i = 0; i < techs.length; i++) {
            let tech = techs[i];
            newFeatures.push({
                type: "Feature",
                properties: {...tech, id: technicianId, tsecs: new Date()},
                geometry: {type: "Point", coordinates: tech.coordinates}
            });
        }

        let newObj : Features = { "features": newFeatures };
        await SolarFarmModal.updateOne({id: solarFarmId}, {$push: {currentTechnicians: newObj}});
        return { response: newObj };
    }
}

export async function connectToDB() {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect("mongodb://localhost:27017/");
    
}