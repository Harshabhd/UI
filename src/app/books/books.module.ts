import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BookstoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BooksModule { }
