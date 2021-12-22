import {IsString} from "class-validator";

export class VideoModel {

    @IsString() readonly title: string;
    @IsString() readonly uri: string;

}
