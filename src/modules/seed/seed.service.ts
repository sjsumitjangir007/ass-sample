import { Injectable } from '@nestjs/common';
import { CSVUser } from './models/csv_user.model';
import { User } from 'src/modules/database/entities/users/users.entity';
import { CSVParserService } from '../csv_parser/csv_parser.service';
import { UsersService } from '../database/entities/users/users.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly usersService: UsersService,
    private readonly parserService: CSVParserService,
  ) {
    this.handleData();
  }
  loadFile(filePath: string) {
    if (filePath) {
      const headers = new Headers();
      headers.append('Accept', 'ext/csv; charset=utf-8');
      const myInit = {
        method: 'GET',
        headers: headers,
      };
      const request = new Request(filePath);

      return fetch(request, myInit);
    }
    return Promise.reject('File path does not exist');
  }

  handleData() {
    this.loadFile(process.env.CSV_DATA_FILE_PATH)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.text();
      })
      .then((csvData: string) => {
        const read = this.parserService.parse(csvData);
        const usersList = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        read.on('headers', (headers) => {
          // console.log('Headers:- ', headers);
        });
        read.on('row', async (csvUser: CSVUser) => {
          const u = new User();
          u.name = `${csvUser['name.firstName'] || ''} ${
            csvUser['name.lastName'] || ''
          }`;
          u.age = csvUser.age || 10;
          u.address = {
            line1: csvUser['address.line1'],
            line2: csvUser['address.line2'],
            city: csvUser['address.city'],
            state: csvUser['address.state'],
          };
          u.additional_info = {
            gender: csvUser.gender,
          };
          usersList.push(u);
          console.log(u);
          const uu = await this.usersService.addOne(u);
          console.log('Data added top db uu:- ', uu);
        });
        read.on(
          'final',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (finalValue: { headers: string[]; row: CSVUser[] }) => {
            // console.log('Capture final value:- ', finalValue, usersList);
          },
        );
        read.on('error', (err) => {
          console.log('Capture error:- ', err);
        });
      })
      .catch((error) => {
        console.log('File Load Error:- ', error);
      });
  }
}
