import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
  private httpClient = inject(HttpClient);
  uploadFile(file:File){
    const formData = new FormData()
    formData.append('upload_preset','kyhqokcw')
    formData.append('file',file)
    return this.httpClient.post(`${environment.cloudinaryConfig.urlBase}/${environment.cloudinaryConfig.cloudName}/upload`,formData).pipe(map((data:any)=> data.secure_url));
  }

}
