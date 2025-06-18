import { Component, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

import { ApiService } from './shared/service/api.service';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SharedModule,AuthModule,UsersModule,BooksModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent implements OnInit
  {

    ngOnInit(): void {
      debugger
      let status=this.apiservice.isLoggedIn()?'loggedIn':'loggedOff';
      this.apiservice.UserStatus.next(status);
    }
   
    constructor(private apiservice:ApiService) {
    
      
    }
  title = 'UI';
}
