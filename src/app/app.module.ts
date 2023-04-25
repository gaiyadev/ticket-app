import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HistoryComponent } from './history/history.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { StudentComponent } from './student/student.component';
import { TicketComponent } from './ticket/ticket.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { WalletComponent } from './wallet/wallet.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TicketsComponent } from './tickets/tickets.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RecieptComponent } from './reciept/reciept.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    HistoryComponent,
    CompleteRegistrationComponent,
    StudentComponent,
    TicketComponent,
    AddStudentComponent,
    WalletComponent,
    SideNavComponent,
    TicketsComponent,
    EditTicketComponent,
    EditStudentComponent,
    BookTicketComponent,
    TransactionComponent,
    RecieptComponent,
    AllBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
