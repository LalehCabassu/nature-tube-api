import {Video} from "./video";
import {IsString} from "class-validator";

export class Collection {

    @IsString() readonly id: string;
    @IsString() readonly title: string;
    // [key: number]: Video;
    videos: Video[];

}
