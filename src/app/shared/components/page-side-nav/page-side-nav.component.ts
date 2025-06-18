import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { UserType } from '../../../Model/Model';
import { ApiService } from '../../service/api.service';


export interface NavigationItem {
  value: string;
  link: string;
}
@Component({
  selector: 'app-page-side-nav',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss'
})
export class PageSideNavComponent {
  panelName: string = '';
  navItems: NavigationItem[] = [];

  constructor(private apiservice: ApiService, private router: Router) {
    this.navItems = [
      { value: 'View Books', link: 'view-books' },
      { value: 'My Orders', link: 'my-orders' },
    ];
    apiservice.UserStatus.subscribe({
      next: (res) => {
        if (res == "loggedIn") {
          router.navigateByUrl('/home')
          let user = apiservice.getUserInfo();
          if (user != null) {
            if (user.userType == UserType.ADMIN) {
              this.panelName = 'Admin Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                { value: 'Maintenance', link: '/maintenance' },
                { value: 'Return Book', link: '/return-book' },
                { value: 'View Users', link: '/view-users' },
                { value: 'Aproval Requests', link: '/approval-requests' },
                { value: 'All Orders', link: '/all-orders' },
                { value: 'My Orders', link: '/my-orders' },
              ]
            } else if (user.userType == UserType.STUDENT) {
              this.panelName = 'Student Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                { value: 'My Orders', link: '/my-orders' },
              ];
            }
          }
        }else if(res=='loggedOff'){
          this.panelName='Auth Panel';
         router.navigateByUrl('/login');
         this.navItems=[];
        }
      }
    })
  }


}
