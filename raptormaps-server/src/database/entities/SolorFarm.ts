import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { Features } from "./Features";

@ObjectType()
export class SolarFarm {
    @Field(() => [Features])
    @prop({type: [Features], required: true})
    currentTechnicians : Features[]

    @Field(() => Int)
    @prop({required: true, default: 1})
    id : number;

    @Field(() => Int)
    @prop({required: true, default: 1})
    technicianId : number;
}

export const SolarFarmModal = getModelForClass(SolarFarm);