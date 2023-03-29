import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardLayoutComponent} from "./dashboard-layout/dashboard-layout.component";
import {HistoryComponent} from "./history/history.component";
import {CompleteRegistrationComponent} from "./complete-registration/complete-registration.component";
import {AuthGuardGuard} from "./guards/authguard.guard";
import {StudentComponent} from "./student/student.component";
import {TicketComponent} from "./ticket/ticket.component";
import {AddStudentComponent} from "./add-student/add-student.component";
import {WalletComponent} from "./wallet/wallet.component";
import {TicketsComponent} from "./tickets/tickets.component";
import {EditTicketComponent} from "./edit-ticket/edit-ticket.component";
import {EditStudentComponent} from "./edit-student/edit-student.component";
import {BookTicketComponent} from "./book-ticket/book-ticket.component";
import {TransactionComponent} from "./transaction/transaction.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: "Home"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login"
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: "Register"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: "Dashboard",
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'history',
    component: HistoryComponent,
    title: "History",
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'registration/:id',
    component: CompleteRegistrationComponent,
    title: "Registration"
  },
  {
    path: 'student',
    component: StudentComponent,
    title: "Student",
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
    title: "Add Student",
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'student/:id',
    component: EditStudentComponent,
    title: "Edit Student",
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'add-ticket',
    component: TicketComponent,
    title: "Ticket",
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    title: "All Tickets",
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'tickets/:id',
    component: EditTicketComponent,
    title: "Edit Ticket",
    canActivate: [AuthGuardGuard],

  },
  {
    path: 'book-ticket/:id',
    component: BookTicketComponent,
    title: "Book Ticket",
    canActivate: [AuthGuardGuard],

  },
  {
    path: 'wallet',
    component: WalletComponent,
    title: "wallet",
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    title: "Transaction",
    canActivate: [AuthGuardGuard],
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   children: [
  //     { path: '', component: DashboardComponent, pathMatch: 'full'},
  //     { path: 'history', component: HistoryComponent, pathMatch: 'full'},
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
