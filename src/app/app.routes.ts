import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookstoreComponent } from './books/bookstore/bookstore.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserordersComponent } from './users/userorders/userorders.component';

export const routes: Routes = [
    {path:'home',component:BookstoreComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},  
    {path:'my-orders',component:UserordersComponent},
    {path:'**',component:PageNotFoundComponent},
    
];
