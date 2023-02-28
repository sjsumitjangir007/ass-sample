import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private isDataInitialized = false;

  getHello(): string {
    return 'Hello World! Seed state:- ' + this.isDataInitialized;
  }

  loadFile(filePath: string) {
    if (filePath) return fetch(filePath);
    return Promise.reject('File path does not exist');
  }

  setIsDataInitialized(dataInitiazed: boolean) {
    this.isDataInitialized = dataInitiazed;
  }

  getIsDataInitialized() {
    return this.isDataInitialized;
  }
}
