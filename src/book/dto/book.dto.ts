import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty({ message: '书名不能为空' })
  name: string;

  @IsNotEmpty({ message: '作者不能为空' })
  author: string;

  @IsNotEmpty({ message: '描述不能为空' })
  description: string;

  @IsNotEmpty({ message: '封面不能为空' })
  cover: string;
}

export class UpdateBookDto {
  @IsNotEmpty({ message: '书名不能为空' })
  name: string;

  @IsNotEmpty({ message: '作者不能为空' })
  author: string;

  @IsNotEmpty({ message: '描述不能为空' })
  description: string;

  @IsNotEmpty({ message: '封面不能为空' })
  cover: string;

  @IsNotEmpty({ message: 'ID不能为空' })
  id: number;
}
