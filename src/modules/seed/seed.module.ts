import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { CSVParserModule } from '../csv_parser/csv_parser.module';

@Module({
  imports: [DatabaseModule, CSVParserModule],
  controllers: [],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
