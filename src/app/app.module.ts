import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEditEmployeeComponent } from './employee-details/add-edit-employee/add-edit-employee.component';
import { ShowEmployeeComponent } from './employee-details/show-employee/show-employee.component';

import { EmployeeService } from './employee-service.service';
import { CommonModule } from '@angular/common';
import { CustomHeaderInterceptor } from './CustomHeaderInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    AddEditEmployeeComponent,
    ShowEmployeeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHeaderInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
