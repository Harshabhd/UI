import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Subject } from 'rxjs';
import { Book, order, User, UserType } from '../../Model/Model';

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
  orderBook(book:Book){
    let userid=this.getUserInfo()!.id;
    let params=new HttpParams().append('userid',userid).append('bookId',book.id);

    return this.http.post('http://localhost:5239/api/Library/OrderBook',null,{
      params:params,
      responseType:'text',
    }

    );
  }
  getOrderOfUSer(userId:number){
    let parama=new HttpParams().append('userId',userId);
    return this.http.get<any>('http://localhost:5239/api/Library/GetOrdersOFUser',{
      params:parama,
    })
    .pipe(
      map((orders) => {
        let newOrders = orders.map((order: any) => {
          let newOrder= {
            id: order.id,
            userId: order.userId,
            userName: order.user.firstName + ' ' + order.user.lastName,
            bookId: order.bookId,
            bookTitle: order.book.title,
            orderDate: order.orderDate,
            returned: order.returned,
            returnDate: order.returnDate,
            finePaid: order.finePaid,
          };
          return newOrder;
        });
        return newOrders;
      })
    );
  }
  
  getFine(order:order){
    let today= new Date();
    let orderDate=new Date(Date.parse(order.orderDate));
    orderDate.setDate(orderDate.getDate()+10);
    if(orderDate.getTime()<today.getTime()){
      var diff=today.getTime()-orderDate.getTime();
      let days=Math.floor(diff/(1000*86400));
      return days*50;
    }
    return 0;
  }
}