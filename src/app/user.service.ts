import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {User} from './user';

import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  private userUrl = 'http://localhost:8080/Controller?command=SendUsers';
  private userUrlRegister = 'http://localhost:8080/Controller?command=RegisterUser';
  private deleteUserUrl = 'http://localhost:8080/Controller?command=DeleteUser';

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }


  changeUserInfo(thisUser: User): void {

    let body = new HttpParams()
      .append('firstName', thisUser.firstName)
      .append('lastName', thisUser.lastName)
      .append('email', thisUser.email)
      .append('gsm', thisUser.gsm);
      // .append('password', thisUser.password);


    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<any>(this.userUrl, body, {headers: header}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err));
  }

  registerNewUser(thisUser: User): void {
    let body = new HttpParams()
      .append('firstName', thisUser.firstName)
      .append('lastName', thisUser.lastName)
      .append('gsm', thisUser.gsm);
    // .append('password', thisUser.password);


    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<any>(this.userUrlRegister, body, {headers: header}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err));
  }

  deleteUser(thisUser: User): void {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<any>(this.deleteUserUrl, thisUser.email, {headers: header}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err));
  }
}
