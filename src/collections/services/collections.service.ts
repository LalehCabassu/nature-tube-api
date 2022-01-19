import {Injectable, Logger} from '@nestjs/common';
import {CollectionModel} from "../models/collection.model";
import {child, getDatabase, get, ref, set} from "firebase/database";
import {v4} from 'uuid';
import {CollectionIdModel} from "../models/collection-id.model";

@Injectable()
export class CollectionsService {

    private collections: Map<string, CollectionModel>;

    constructor() {
        this.collections = new Map<string, CollectionModel>();
    }

    getAllCollections(): Promise<CollectionModel[] | any> {
        const dbRef = ref(getDatabase());
        return get(child(dbRef, 'collections'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach(child => {
                        const collection = child.val() as CollectionModel;
                        this.collections.set(collection.id, collection);
                    })
                    return Promise.resolve(Array.from(this.collections.values()));
                } else {
                    Logger.log('Get all collections: No data available!');
                    return Promise.resolve([]);
                }
            }).catch((error) => {
                Logger.error('Get all collections: ', error);
                return Promise.reject();
            });
    }

    getCollection(id: string): Promise<CollectionModel | any> {
        if (this.collections.has(id)) {
            return Promise.resolve(this.collections.get(id));
        }

        return this.getAllCollections()
            .then(() => {
                if (this.collections.has(id)) {
                    return Promise.resolve(this.collections.get(id));
                }
                Logger.error('Collection not found: id=[]!', id);
                return Promise.reject();
            });
    }

    addCollection(collection: CollectionModel): Promise<CollectionIdModel | any> {
        const id = v4();
        const db = getDatabase();
        return set(ref(db, 'collections/' + id), {
            id: id,
            title: collection.title,
            videos: collection.videos ? [{
                title: collection.videos[0].title,
                uri: collection.videos[0].uri
            }] : []
        }).then(() => {
            return Promise.resolve({
                id: id
            } as CollectionIdModel);
        }).catch(error => {
            Logger.error('Add collection: ', error);
            return Promise.reject();
        });
    }
}
