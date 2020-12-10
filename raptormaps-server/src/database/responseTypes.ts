import { Field, ObjectType } from "type-graphql";
import { Features } from "./entities/Features";

@ObjectType() 
export class FeaturesResponse {
    @Field(() => [String], {nullable: true})
    errors? : string[];

    @Field(() => Features, {nullable: true})
    response? : Features;
}