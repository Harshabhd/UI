import { Component } from '@angular/core';
import { UserType } from '../../Model/Model';
import { ApiService } from '../../shared/service/api.service';



export interface TableElement{
  name:string;
  value:string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
columns:string[]=['name','value'];
dataSource:TableElement[]=[];

constructor(private apiservice:ApiService) {
  
let user=apiservice.getUserInfo()!;

this.dataSource=[
  {name:'Name',value:user.firstName+ " "+user.lastName},
  {name:'Email',value:`${user.email}`},
  {name:'Mobile',value:`${user.mobileNumber}`},
  {name:'Account Status',value:`${user.accountStatus}`},
  {name:'Created On',value:`${user.createdOn}`},
  {name:'Email',value:`${user.email}`},
  {name:'Type',value:`${UserType[user.userType]}`}
]
}
}
