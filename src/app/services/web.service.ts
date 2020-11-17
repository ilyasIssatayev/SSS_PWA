import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { retry, catchError, map } from "rxjs/operators";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebService {
  url = "https://sedcon-backend.herokuapp.com";
  token;
  constructor(private http: HttpClient) {

  }

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    postLogin(loginData): Observable<any> {
      //console.log("postLogin: ",loginData);

      let bodyToSend;

      bodyToSend = {
        "email":loginData.account,
        "password":loginData.password
      }
      console.log("Post: Login with loginData",bodyToSend);
      return this.http
        .post<any>(this.url + "/login",bodyToSend ,this.httpOptions);
}
}
