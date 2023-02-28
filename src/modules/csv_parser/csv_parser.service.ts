import { Injectable } from '@nestjs/common';
import { createInterface } from 'readline';
import { EventEmitter, Readable } from 'stream';

@Injectable()
export class CSVParserService {
  constructor() {
    console.log('CSV Parser Service init');
  }

  parse(data: string): EventEmitter {
    const emitter = new EventEmitter();
    const s = Readable.from(data);
    const rl = createInterface({ input: s });
    let counter = 0;
    let headers = null;
    const row = [];
    rl.on('line', (line) => {
      if (counter === 0) {
        headers = line
          .trim()
          .split(',')
          .map((colV) => {
            return colV.trim();
          });
        emitter.emit('headers', headers);
      } else {
        const ins = {};
        const cols = line.trim().split(', ');
        cols.forEach((colV, index) => {
          const _v = colV.trim();
          if (headers[index]) {
            ins[headers[index]] = _v;
          }
        });
        row.push(ins);
        emitter.emit('row', ins);
      }

      ++counter;
    });
    rl.on('error', (error) => {
      emitter.emit('error', error);
    });
    rl.on('close', () => {
      emitter.emit('final', {
        headers,
        row,
      });
    });
    return emitter;
  }
}
