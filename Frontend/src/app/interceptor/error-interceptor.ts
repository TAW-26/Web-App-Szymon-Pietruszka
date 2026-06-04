import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      if (error.status === 0 || error.status === 500) {
        router.navigate(['/server-error']);
      } 
      else if (error.status === 404) {
        router.navigate(['/not-found']);
      }

      return throwError(() => error);
    })
  );
};