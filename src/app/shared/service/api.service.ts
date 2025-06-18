import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { Book, User, UserType } from '../../Model/Model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,private jwt:JwtHelperService) { }


  UserStatus:Subject<string>=new Subject();


  register(user:any){
    debugger
    return this.http.post('http://localhost:5239/api/Library/Register',user,
    {
      responseType:'text',
    })
  }


  login(info: any) {
    debugger
    let parameters = new HttpParams().append('email', info.email)
      .append('password', info.password);

    return this.http.get('http://localhost:5239/api/Library/Login', {
      params: parameters,
      responseType: 'text',
    });

}

  isLoggedIn(): boolean {
    if (localStorage.getItem('access_token') != null && !this.jwt.isTokenExpired()) {
      return true;
    }
    return false;
  }

  getUserInfo():User | null{
    if(!this.isLoggedIn()){
      return null;
    }
    var decodedToken=this.jwt.decodeToken();
    var user:User={
      id:decodedToken.id,
      firstName:decodedToken.firstName,
      lastName:decodedToken.lastName,
      email:decodedToken.email,
      mobileNumber:decodedToken.mobileNumber,
      userType:UserType[decodedToken.userType as keyof typeof UserType],
      accountStatus:decodedToken.accountStatus,
      createdOn:decodedToken.createdOn,
      password:'',
    };
    return user;
  }


  logout(){
    localStorage.removeItem('access_token');
    this.UserStatus.next('loggedOff');
  }


  getBooks(){
    debugger
    return this.http.get<Book[]>('http://localhost:5239/api/Library/GetBooks');
  }
}