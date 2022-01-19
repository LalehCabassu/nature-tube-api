import {Body, Controller, Get, Logger, Param, Post, Query} from '@nestjs/common';
import {CollectionsService} from "../services/collections.service";
import {CollectionModel} from "../models/collection.model";

@Controller()
export class CollectionsController {

    constructor(private readonly collectionsService: CollectionsService) {
    }

    @Get('collections')
    async getAllCollections(): Promise<CollectionModel[]> {
        return await this.collectionsService.getAllCollections();
    }

    @Get('collection')
    async getCollection(@Query('id') id: string): Promise<CollectionModel> {
        return await this.collectionsService.getCollection(id);
    }

    @Post('collection')
    async addCollection(@Body() collection: CollectionModel): Promise<CollectionModel> {
        return await this.collectionsService.addCollection(collection);
    }
}
