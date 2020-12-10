import { index, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Feature } from "./Feature";

@ObjectType()
@index({geometry: '2dsphere'})
export class Features {
    @Field(() => [Feature])
    @prop()
    features : Feature[];
}
