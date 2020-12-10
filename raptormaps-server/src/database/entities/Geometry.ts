import { prop } from "@typegoose/typegoose";
import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Geometry {
    @Field()
    @prop({default: "Point"})
    type : string;

    @Field(() => [Float])
    @prop({type: [Number], required: true})
    coordinates: [number]
}