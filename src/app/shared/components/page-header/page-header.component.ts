import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { ApiService } from '../../service/api.service';
import { SharedModule } from '../../shared.module';


@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  loggedIn: boolean = false;
  name: string = '';

  constructor(private apiservice: ApiService,private router:Router) {
    apiservice.UserStatus.subscribe({
      next: (res) => {
        if (res == 'loggedIn') {
          this.loggedIn = true;
          let user = apiservice.getUserInfo();
          this.name = `${user?.firstName} ${user?.lastName}`;
        } else {
          this.loggedIn = false;
          this.name = '';
        }
      }
    })

  }
  logout() {
    this.apiservice.logout();
    this.apiservice.UserStatus.next('loggedOff');
    this.router.navigateByUrl('/login');

  }
}
