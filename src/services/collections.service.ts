import { Injectable } from '@nestjs/common';
import {Collection} from "../models/collection";

@Injectable()
export class CollectionsService {

    private readonly firstCollectionId = '1';
    private readonly secondCollectionId = '2';
    private readonly firstVideoId = '11';
    private readonly secondVideoId = '22';

    private collections: Map<string, Collection>;

    constructor() {

        this.collections = new Map<string, Collection>();

        this.collections.set(this.firstCollectionId, {
            id: this.firstCollectionId,
            title: 'AuraMax',
            videos: [{
                id: this.firstVideoId,
                title: 'AuraMax 2021 11 04',
                uri: 'http://data.phys.ucalgary.ca/sort_by_project/AuroraMAX/rt-movies/mp4/2021/11/04/auroramaxHD_20211104_720p.mp4'
            }]
        });

        this.collections.set(this.secondCollectionId, {
            id: this.secondCollectionId,
            title: 'YouTube',
            videos: [{
                id: this.secondVideoId,
                title: 'NASA Live',
                uri: 'https://www.youtube.com/watch?v=fk5PWZIATvU'
            }]
        });
    }

    getAllCollections(): Collection[] {
        return Array.from(this.collections.values());
    }

    getCollection(id: string): Collection {
        return this.collections.get(id);
    }

    addCollection(collection: Collection) {
        const id = '3';
        this.collections.set(id, {
            id: id,
            title: collection.title,
            videos: collection.videos ? [{
                id: '33',
                title: collection.videos[0].title,
                uri: collection.videos[0].uri
            }] : []
        });
    }

}
