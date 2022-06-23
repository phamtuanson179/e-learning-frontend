import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { param } from "jquery";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(private httpClient: HttpClient) {}

  get_all(): Observable<any> {
    return this.httpClient
      .get("http://localhost:3000/subject")
      .pipe(map((res) => res));
  }

  get_subject_by_id(params: { id: string }): Observable<any> {
    return this.httpClient
      .get("http://localhost:3000/subject", { params })
      .pipe(map((res) => res));
  }

  create(data: any): Observable<any> {
    return this.httpClient
      .post("http://localhost:3000/subject", data)
      .pipe(map((res) => res));
  }

  update(data: any, params: any): Observable<any> {
    return this.httpClient
      .put("http://localhost:3000/subject/" + params?.id, data)
      .pipe(map((res) => res));
  }

  delete(params: any): Observable<any> {
    return this.httpClient
      .delete("http://localhost:3000/subject/" + params?.id)
      .pipe(map((res) => res));
  }
}
