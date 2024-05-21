import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { ProgressSpinnerService } from '../components/progress-spinner/progress-spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private spinnerService = inject(ProgressSpinnerService);
  private pendingRequestsIds: number[] = [];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    const reqId = new Date().getTime();
    this.pendingRequestsIds.push(reqId);
    return next.handle(request).pipe(
      finalize(() => {
        this.pendingRequestsIds = this.pendingRequestsIds.filter(id => id !== reqId);
        if (!this.pendingRequestsIds.length) {
          this.spinnerService.hide();
        }
      }))
  }
}
