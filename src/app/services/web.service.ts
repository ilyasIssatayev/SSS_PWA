import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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
      "Content-Type": "application/json"
    })
  };

  httpOptionsToken = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${this.getToken()}`
    })
  };

  getToken() {
    let output = localStorage.getItem("local_token");

    if (typeof output === "undefined" || output === null) {
      console.log("WARNING TOKEN IS /undefined/");
    }
    //console.log("GET TOKEN: ", output);
    return output;
  }

  setToken(newToken) {
    localStorage.setItem("local_token", newToken);

    this.httpOptionsToken = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`
      })
    };
    console.log(`Token set to ${this.token}`);
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
    // console.log("Post: Login with loginData", bodyToSend);
    return this.http.post<any>(
      this.url + "/login",
      bodyToSend,
      this.httpOptions
    );
  }

  putName(userData): Observable<any> {
    console.log("HTTP_OPTIONS: ", this.httpOptionsToken.headers);

    let bodyToSend;

    bodyToSend = {
      firstname: userData.name
    };
    return this.http.put<any>(
      this.url + "/user/firstname",
      bodyToSend,
      this.httpOptionsToken
    );
  }

  putSurname(userData): Observable<any> {
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

  putCSVTariff(userData): Observable<any> {
    let bodyToSend;

    bodyToSend = {
      csv: userData.csv
    };
    return this.http.put<any>(
      this.url + "/user/tariff",
      bodyToSend,
      this.httpOptionsToken
    );
  }

  postHouseNumber(userData): Observable<any> {
    let bodyToSend;

    bodyToSend = {
      house_number: userData.houseNumber
    };
    return this.http.put<any>(
      this.url + "/user/house-number",
      bodyToSend,
      this.httpOptionsToken
    );
  }

  getUserName(userData): Observable<any> {
    return this.http.get<any>(
      this.url + "/user/firstname",
      this.httpOptionsToken
    );
  }

  getSurname(userData): Observable<any> {
    return this.http.get<any>(
      this.url + "/user/lastname",
      this.httpOptionsToken
    );
  }

  getHouseNumber(): Observable<any> {
    return this.http.get<any>(
      this.url + "/user/house-number",
      this.httpOptionsToken
    );
  }
  getVemBalance(date) {
    return this.http.get<any>(
      `${this.url}/vem/balance?start=${date.moth}-${date.day}-${date.year}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "none",
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );
  }
  getVemBalanceRange(start_date, end_date) {
    return this.http.get<any>(
      `${this.url}/vem/balance?start=${start_date.moth}-${start_date.day}-${start_date.year}&end=${end_date.moth}-${end_date.day}-${end_date.year}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "none",
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );
  }
  getTariff() {
    return this.http.get<any>(
      `${this.url}/admin/tariff`,
      this.httpOptionsToken
    );
  }
}
