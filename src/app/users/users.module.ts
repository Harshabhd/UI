import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserordersComponent } from './userorders/userorders.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserordersComponent
  ],
  imports: [
    CommonModule,SharedModule
  ]
})
export class UsersModule { }
