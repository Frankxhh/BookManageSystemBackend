import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  constructor(private readonly dbService: DbService) {}

  async list() {
    const db = await this.dbService.getDb();
    return db;
  }

  async findOne(id: number) {
    const db = await this.dbService.getDb();
    const book = db.find((book: Book) => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async create(createBookDto: CreateBookDto) {
    const db = await this.dbService.getDb();
    const book = db.find((book: Book) => book.name === createBookDto.name);
    if (book) {
      throw new BadRequestException('Book already exists');
    }

    await this.dbService.setDb({
      id: randomNum(),
      name: createBookDto.name,
      author: createBookDto.author,
      description: createBookDto.description,
      cover: createBookDto.cover,
    });
  }

  async update(updateBookDto: UpdateBookDto) {
    const db: Book[] = await this.dbService.getDb();
    const book = db.find((book: Book) => book.id === updateBookDto.id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    book.name = updateBookDto.name;
    book.author = updateBookDto.author;
    book.description = updateBookDto.description;
    book.cover = updateBookDto.cover;
    await this.dbService.setDb(db);
  }
  async remove(id: number) {
    const db = await this.dbService.getDb();
    const book = db.find((book: Book) => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    db.splice(db.indexOf(book), 1);
    await this.dbService.setDb(db);
  }
}
