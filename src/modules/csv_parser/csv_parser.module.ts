import { Module } from '@nestjs/common';
import { CSVParserService } from './csv_parser.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CSVParserService],
  exports: [CSVParserService],
})
export class CSVParserModule {
  constructor() {
    console.log('CSV Parser Module init');
  }
}
