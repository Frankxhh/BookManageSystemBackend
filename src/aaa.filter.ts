import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Test } from './test';

@Catch(Test)
export class AaaFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    // host中包含切换上下文的方法，例如区分http/ws的上下文内容
    console.log(exception);
  }
}
