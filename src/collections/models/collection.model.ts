import {VideoModel} from "./video.model";
import {IsString} from "class-validator";

export class CollectionModel {

    @IsString() readonly id: string;
    @IsString() readonly title: string;
    // [key: number]: VideoModel;
    videos: VideoModel[];

}
