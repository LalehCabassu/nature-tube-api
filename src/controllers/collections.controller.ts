import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CollectionsService} from "../services/collections.service";
import {Collection} from "../models/collection";

@Controller('collections')
export class CollectionsController {

    constructor(private readonly collectionsService: CollectionsService) {
    }

    @Get()
    async getAllCollections(): Promise<Collection[]> {
        return this.collectionsService.getAllCollections();
    }

    @Get(':id')
    async getCollection(@Param('id') id: string): Promise<Collection> {
        return this.collectionsService.getCollection(id);
    }

    @Post()
    async addCollection(@Body('collection') collection): Promise<void> {
        this.collectionsService.addCollection(collection);
    }
}
