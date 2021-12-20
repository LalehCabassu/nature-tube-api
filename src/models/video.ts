import {IsString} from "class-validator";

export class Video {

    @IsString()  readonly id: string;
    @IsString() readonly title: string;
    @IsString() readonly uri: string;

}
