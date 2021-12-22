import { Module } from '@nestjs/common';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [CollectionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
