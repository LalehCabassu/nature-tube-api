import {Injectable, Logger} from '@nestjs/common';
import {CollectionModel} from "../models/collection.model";
import {child, getDatabase, get, ref, set} from "firebase/database";

@Injectable()
export class CollectionsService {

    private readonly firstCollectionId = '1';
    private readonly secondCollectionId = '2';

    private collections: Map<string, CollectionModel>;

    constructor() {

        this.collections = new Map<string, CollectionModel>();

        this.collections.set(this.firstCollectionId, {
            id: this.firstCollectionId,
            title: 'AuraMax',
            videos: [{
                title: 'AuraMax 2021 11 04',
                uri: 'http://data.phys.ucalgary.ca/sort_by_project/AuroraMAX/rt-movies/mp4/2021/11/04/auroramaxHD_20211104_720p.mp4'
            }]
        });

        this.collections.set(this.secondCollectionId, {
            id: this.secondCollectionId,
            title: 'YouTube',
            videos: [{
                title: 'NASA Live',
                uri: 'https://www.youtube.com/watch?v=fk5PWZIATvU'
            }]
        });
    }

    getAllCollections(): CollectionModel[] {

        const dbRef = ref(getDatabase());
        get(child(dbRef, `collections`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        return Array.from(this.collections.values());
    }

    getCollection(id: string): CollectionModel {
        return this.collections.get(id);
    }

    addCollection(collection: CollectionModel) {
        const id = '3';
        // this.collections.set(id, {
        //     id: id,
        //     title: collection.title,
        //     videos: collection.videos ? [{
        //         title: collection.videos[0].title,
        //         uri: collection.videos[0].uri
        //     }] : []
        // });
        const db = getDatabase();
        set(ref(db, 'collections/' + id), {
            id: id,
            title: collection.title,
            videos: collection.videos ? [{
                title: collection.videos[0].title,
                uri: collection.videos[0].uri
            }] : []
        });
    }

}
