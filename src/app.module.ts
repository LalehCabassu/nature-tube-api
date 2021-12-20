import { Module } from '@nestjs/common';
import {CollectionsController} from "./controllers/collections.controller";
import {CollectionsService} from "./services/collections.service";

@Module({
  imports: [],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class AppModule {}
