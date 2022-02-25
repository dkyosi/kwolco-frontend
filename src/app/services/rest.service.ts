import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  serverUrl:string ='http://localhost:5000/api/v1/'
  httpOptions: any = {};
  loginAccessToken: string = ''
  user_details: any = []

  constructor(private http:HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };
  }


  templateLoader(url:string, data:{}) {
    return new Promise((resolve, reject) => {
      this.http.post(this.serverUrl + url, data, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  mainGet(url:string) {
    const reqOpts = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('STORAGE_KEY_TOKEN'),
        'Content-Type': 'application/json',
      },
    };

    

    return this.http.get(this.serverUrl + url, reqOpts)
  }

  deleteMapping(url:string){
    const reqOpts = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('STORAGE_KEY_TOKEN'),
        'Content-Type': 'application/json',
      },
    };
    return this.http.delete(this.serverUrl + url, reqOpts)
  }

  mainPut(url:string, data:{}) {
    const reqOpts = {
      headers: {
         'Authorization': 'Bearer ' + localStorage.getItem('STORAGE_KEY_TOKEN'),
        'Content-Type': 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      this.http.put(this.serverUrl + url, data, reqOpts)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  mainPost(url:string, data:{}) {
    const reqOpts = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('STORAGE_KEY_TOKEN'),
        'Content-Type': 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.serverUrl + url, data, reqOpts)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

}
