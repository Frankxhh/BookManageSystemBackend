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
    await writeFile(this.options.path, JSON.stringify(data ?? [], null, 2), { encoding: 'utf-8' });
  }
}
