import { Catch, HttpException } from '@nestjs/common';
import { throwError } from 'rxjs';

import type { ExecutionContext, ExceptionFilter } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ExecutionContext): Observable<any> {
		return throwError(() => ({
			statusCode: exception.getStatus(),
			message: exception.message,
		}));
	}
}
