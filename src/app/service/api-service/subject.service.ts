import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient) { }
  
  get_all():Observable<any>{
    return this.httpClient.get('http://localhost:3000/subject').pipe(map(res=>res))
  }

  create(data:any):Observable<any>{
    return this.httpClient.post('http://localhost:3000/subject', data).pipe(map(res=>res))
  }

  update(params: any, data:any):Observable<any>{
    return this.httpClient.put('http://localhost:3000/subject', data, {params: params}).pipe(map(res=>res))
  }

  delete(params: any, data:any):Observable<any>{
    return this.httpClient.delete('http://localhost:3000/subject', {params: params}).pipe(map(res=>res))
  }
}
