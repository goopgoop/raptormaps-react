import { index, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Geometry } from "./Geometry";
import { Technician } from "./Technician";

@ObjectType()
@index({geometry: '2dsphere'})
export class Feature {
    @Field()
    @prop({default: "Feature"})
    type : string;

    @Field()
    @prop()
    properties: Technician;

    @Field()
    @prop()
    geometry : Geometry
}