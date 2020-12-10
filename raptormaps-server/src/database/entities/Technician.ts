import {  prop } from "@typegoose/typegoose";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
export class Technician {
    @Field(() => Int)
    @prop({default: 1})
    public id : number;

    @Field(() => String)
    @prop({required: true})
    public name : string;

    @Field(() => String)
    @prop({default: new Date(), required: true}) 
    public tsecs : Date = new Date();

    @Field(() => Int)
    @prop({required: true})
    public bearing : number;
}

