import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  constructor(private httpClient: HttpClient) { }

  // getAll():Observable<any>{
  //   return this.httpClient('http/:')
  // }
}
