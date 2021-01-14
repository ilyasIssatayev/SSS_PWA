import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { retry, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WebService {
  //The main url of the backend
  //If you change this url, all request wil be directed to new url
  url = "https://sedcon-backend.herokuapp.com";

  //The main token of the user, that will be used as authorization key in majoroty requests
  token;

  //Class constructor, here http library isimported in use as 'http' variable
  constructor(private http: HttpClient) {}

  // Http Options wihtout TOKEN
  //this options states that request has json object
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
 // Http Options with TOKEN
 // this options states that requests has TOKEN as authorization, and has JSON object
  httpOptionsToken = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${this.getToken()}`
    })
  };

  //Gets token from local storage
  getToken() {
    let output = localStorage.getItem("local_token");

    if (typeof output === "undefined" || output === null) {
      console.log("WARNING TOKEN IS /undefined/");
    }
    //console.log("GET TOKEN: ", output);
    return output;
  }
  
  //Saves token into local storage and also updates http options due to new token
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

  //Sends Request to change new password
  postPassword(passwordData): Observable<any>{
    let bodyToSend;

    bodyToSend = {
      oldpassword: passwordData.old_password,
      password: passwordData.new_password
    };

    return this.http.put<any>(
      this.url + "/user/password",
      bodyToSend,
      this.httpOptionsToken
    );
  }

  //Sends Request to set VEM_ACTIVE true or false
  putVemActive(vemActive): Observable<any>{
    let bodyToSend;

    bodyToSend = {
      vem_active: vemActive
    };

    return this.http.put<any>(
      this.url + "/user/vem-active",
      bodyToSend,
      this.httpOptionsToken
    );
  }

  //Sends Request to get value of VEM_ACTIVE  
  getVemActive(): Observable<any>{
    return this.http.get<any>(
      this.url + "/user/vem-active",
      this.httpOptionsToken
    );
  }

  //Sends Request to register new user
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

  //Sends Request to login user
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

  //Sends Request to change User's name
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

  //Sends Request to change User's surname
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

  //Sends Request to sets CSV tariff
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

  //Sends Request to change User's house number
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

  //Sends Request to get Ranking List  
  getRankingList()
  {
    return this.http.get<any>(
      this.url + "/user/ranklist",
      this.httpOptionsToken
    );
  }

  //Sends Request to get User's name  
  getUserName(userData): Observable<any> {
    return this.http.get<any>(
      this.url + "/user/firstname",
      this.httpOptionsToken
    );
  }

  //Sends Request to change User's surname
  getSurname(userData): Observable<any> {
    return this.http.get<any>(
      this.url + "/user/lastname",
      this.httpOptionsToken
    );
  }

  //Sends Request to change User's house number  
  getHouseNumber(): Observable<any> {
    return this.http.get<any>(
      this.url + "/user/house-number",
      this.httpOptionsToken
    );
  }

  //Sends Request to get VEM Balance
  getVemBalance(date) {

    return this.http.get<any>(
      `${this.url}/vem/balance?start=${date.month}-${date.day}-${date.year}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "none",
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );
  }

    //Sends Request to get energy history profile data between chosen dates
  getEnergyProfileHistory(start_date, end_date){
    return this.http.get<any>(
      `${this.url}/energy-history?start=${start_date.month}-${start_date.day}-${start_date.year}&end=${end_date.month}-${end_date.day}-${end_date.year}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "none",
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );
  }

  getColorBlindMode(){
    return this.http.get<any>(
      `${this.url}/user/cb-active`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "none",
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );
  }
  putColorBlindMode(userData){
    let bodyToSend;

    bodyToSend = {
      cb_active: userData.cb_active
    };
    
    return this.http.put<any>(
      `${this.url}/user/cb-active`,
      bodyToSend,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "none",
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );
  }

  //Sends Request to get VEM Balance between chosen dates
  getVemBalanceRange(start_date, end_date) {
    return this.http.get<any>(
      `${this.url}/vem/balance?start=${start_date.month}-${start_date.day}-${start_date.year}&end=${end_date.month}-${end_date.day}-${end_date.year}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "none",
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );
  }

    //Sends Request to get user's In and Out values between given dates
  getVemInOutRange(start_date, end_date) {
    return this.http.get<any>(
      `${this.url}/vem/in-out?start=${start_date.month}-${start_date.day}-${start_date.year}&end=${end_date.month}-${end_date.day}-${end_date.year}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "none",
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );
  }

  //Sends Rquest to get tariff (admin's functionality)
  getTariff() {
    return this.http.get<any>(
      `${this.url}/admin/tariff`,
      this.httpOptionsToken
    );
  }
}
