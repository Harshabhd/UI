import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book, BooksByCategory } from '../../Model/Model';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrl: './bookstore.component.scss'
})
export class BookstoreComponent {


 
  constructor(private apiservice:ApiService,private snackbar:MatSnackBar) {
   apiservice.getBooks().subscribe({
     next:(res:Book[])=>{
     this.books=[],
     res.forEach((b)=>this.books.push(b));
     this.updateList();
     }
   })

  }



  updateList(){
    this.bookstodisplay=[];
    for(let book of this.books){
      let categoryExits=false;
      let categoryBook:BooksByCategory | null;
      for(let bookToDisplay of this.bookstodisplay){
        if(bookToDisplay.bookCategoryId==book.bookCategoryId){
          categoryExits=true;
          categoryBook=bookToDisplay
        }
      }
      if(categoryExits){
        categoryBook!.books.push(book);
      }else{
        this.bookstodisplay.push({
          bookCategoryId:book.bookCategoryId,
          category:book.bookCategory.category,
          subCategory:book.bookCategory.subCategory,
          books:[book],
        })
      }
    }
  }


  searchBooks(value: string) {
    this.updateList();
    value = value.toLowerCase();
    this.bookstodisplay = this.bookstodisplay.filter((bookToDisplay) => {
      bookToDisplay.books = bookToDisplay.books.filter((book) => {
        return book.title.toLowerCase().includes(value);
      });
      return bookToDisplay.books.length > 0;
    });
  }
  getBookCount() {
    let count = 0;
    this.bookstodisplay.forEach((b) => (count += b.books.length));
    return count;
  }

books:Book[]=[];
displayedColumns:string[]=[
  'id',
  'title',
  'author',
  'price',
  'available',
  'order'
];
bookstodisplay:BooksByCategory[]=[
  {
    bookCategoryId:1,
    category:'C',
    subCategory:'S',
    books:[
      {
        id:1,
        title:'T',
        author:'A',
        price:100,
        ordered:false,
        bookCategoryId:1,
        bookCategory:{id:1,category:'',subCategory:''}
      },
    ],
  },
];

}
