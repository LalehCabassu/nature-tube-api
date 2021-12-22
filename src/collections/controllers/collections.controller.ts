import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CollectionsService} from "../services/collections.service";
import {CollectionModel} from "../models/collection.model";

@Controller('collections')
export class CollectionsController {

    constructor(private readonly collectionsService: CollectionsService) {
    }

    @Get()
    async getAllCollections(): Promise<CollectionModel[]> {
        return this.collectionsService.getAllCollections();
    }

    @Get(':id')
    async getCollection(@Param('id') id: string): Promise<CollectionModel> {
        return this.collectionsService.getCollection(id);
    }

    @Post()
    async addCollection(@Body('collection') collection): Promise<void> {
    // async addCollection(): Promise<void> {
        await this.collectionsService.addCollection(collection);
    }
}
