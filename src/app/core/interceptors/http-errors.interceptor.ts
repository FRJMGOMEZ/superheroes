import { Injectable, inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    private matSnackBar = inject(MatSnackBar);

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err)=>{
                this.matSnackBar.open('Ha habido un error en la petición http, consulte con el administrador.');
                throw err;
            })
        )
    }
}
