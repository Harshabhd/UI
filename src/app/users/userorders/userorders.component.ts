import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { order } from '../../Model/Model';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrl: './userorders.component.scss'
})
export class UserordersComponent {



  constructor(private apiservice: ApiService, private snackbar: MatSnackBar) {
    let userId = this.apiservice.getUserInfo()!.id;
    apiservice.getOrderOfUSer(userId).subscribe({
      next: (res: order[]) => {
        this.pendingResult = res.filter((o) => !o.returned);
        this.completedReturn = res.filter((o) => o.returned);
      },
    });
  }


  getFineToPay(order:order){
    debugger
    return this.apiservice.getFine(order);

  }



  columnsForPendingReturns: string[] = [
    'orderId',
    'bookId',
    'bookTitle',
    'orderDate',
    'fineToPay',
  ];
  columnsForCompletedReturns: string[] = [
    'orderId',
    'bookId',
    'bookTitle',
    'orderDate',
    'returnDate',
    'fineToPay',
  ];
  pendingResult: order[] = [];
  completedReturn: order[] = [];
}
