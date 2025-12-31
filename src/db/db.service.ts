import { Inject, Injectable } from '@nestjs/common';
import type { DbModuleOptions } from './db.module';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  constructor(@Inject('OPTIONS') private options: DbModuleOptions) {}

  async getDb() {
    const db = await readFile(this.options.path, 'utf-8').catch(() => '[]');
    return JSON.parse(db);
  }

  async setDb(data: any) {
    const db = await this.getDb();
    db.push(data);
    await writeFile(this.options.path, JSON.stringify(db ?? [], null, 2), { encoding: 'utf-8' });
  }
}
