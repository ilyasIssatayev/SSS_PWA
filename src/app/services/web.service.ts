import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { retry, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class WebService {
  url = "https://sedcon-backend.herokuapp.com";
  token;
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",

    })
  };

  httpOptionsToken= {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': `Bearer ${this.token}`
    })
  };


  getToken() {
    if (this.token === undefined) {
      console.log("WARNING TOKEN IS /undefined/")
    }
    return this.token;
  }

  postRegister(registerData): Observable<any> {
    let bodyToSend;

    bodyToSend = {
      email: registerData.account,
      password: registerData.password
    };
    console.log("Post: Register with registerData", bodyToSend);
    return this.http.post<any>(
      this.url + "/register",
      bodyToSend,
      this.httpOptions
    );
  }

  postLogin(loginData): Observable<any> {
    //console.log("postLogin: ",loginData);

    let bodyToSend;

    bodyToSend = {
      email: loginData.account,
      password: loginData.password
    };
    console.log("Post: Login with loginData", bodyToSend);
    return this.http.post<any>(
      this.url + "/login",
      bodyToSend,
      this.httpOptions
    );
  }

  postName(userData): Observable<any> {
    let bodyToSend;

    bodyToSend = {
      name: userData.name
    };
    return this.http.put<any>(
      this.url + "/user/firstname",
      bodyToSend,
      this.httpOptionsToken
    );
  }

  postSurname(userData): Observable<any> {
    let bodyToSend;

    bodyToSend = {
      lastname: userData.surname
    };
    return this.http.put<any>(
      this.url + "/user/lastname",
      bodyToSend,
      this.httpOptionsToken
    );
  }

  postHouseNumber(userData): Observable<any> {
    let bodyToSend;

    bodyToSend = {
      lastname: userData.lastname
    };
    return this.http.put<any>(
      this.url + "user/firstname",
      bodyToSend,
      this.httpOptionsToken
    );
  }

  getUserName(userData): Observable<any> {
    return this.http.post<any>(
      this.url + "/user/firstname",
      this.httpOptionsToken
    );
  }
  getSurname(userData): Observable<any> {
    return this.http.post<any>(
      this.url + "/user/lastname",
      this.httpOptionsToken
    );
  }
}
