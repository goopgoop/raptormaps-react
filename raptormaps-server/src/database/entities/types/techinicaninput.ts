import { Technician } from "src/database/entities/Technician";
import { Field, Float, InputType } from "type-graphql";

@InputType()
export class TechnicianInput implements Partial<Technician> {
    @Field()
    name : string;

    @Field()
    bearing : number;

    @Field(() => [Float])
    coordinates : [number];
}