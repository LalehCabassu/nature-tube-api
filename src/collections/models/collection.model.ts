import {VideoModel} from "./video.model";
import {IsString} from "class-validator";

export class CollectionModel {

    readonly id: string;
    @IsString() readonly title: string;
    videos: VideoModel[];

}
