import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './core/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerComponent } from './core/components/progress-spinner/progress-spinner.component';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorsInterceptor } from './core/interceptors/http-errors.interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutComponent,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    ProgressSpinnerComponent,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
