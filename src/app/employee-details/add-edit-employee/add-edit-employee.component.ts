import { Component, Input, OnInit } from '@angular/core';
import { Observable, range } from 'rxjs';
import { EmployeeService } from '../../employee-service.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employeeList$!: Observable<any[]>;

  @Input() employee: any;
  empId: number = 0;
  empName: string = ''
  empCode: string = '';
  employeeAge: number = 0;
  employeeAddress: string = '';
  empLocation: string = '';
  empActive: string = 'true';
  ageList: any = [];

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    if(this.employee === undefined){
      this.employee = {
        empId: this.empId,
        empName: this.empName,
        empCode: this.empCode,
        employeeAge: this.employeeAge,
        employeeAddress: this.employeeAddress,
        empLocation: this.empLocation,
        empActive: this.empActive == 'true' ? true:false
      }
    // }
    // else{
    // this.empId = this.employee?.empId;
    // this.empName = this.employee?.empName;
    // this.empCode = this.employee?.empCode;
    // this.employeeAge = this.employee?.employeeAge;
    // this.employeeAddress = this.employee?.employeeAddress;
    // this.empLocation = this.employee?.empLocation;
    // this.empActive = this.employee?.empActive;
    this.employeeList$ = this.empService.getEmployeeList();
    }
  }
  counter(i: number) {
    return new Array(i);
  }
  AddEmployee() {
    var employee = {
      empId: 0,
      empName: this.employee.empName,
      empCode: this.employee.empCode,
      employeeAge: this.employee.employeeAge,
      employeeAddress: this.employee.employeeAddress,
      empLocation: this.employee.empLocation,
      empActive: this.employee.empActive == 'true' ? true:false
    }
    this.empService.addEmployee(employee).subscribe(res => {
      var closeModal = document.getElementById('add-edit-Modal-Close');
      if (closeModal) {
        closeModal.click();
      }

      var alert = document.getElementById('add-success-alert');
      if (alert) {
        alert.style.display = 'block';
      }

      setTimeout(function () {
        if (alert) {
          alert.style.display = 'none'
        }
      }, 4000);
    })
  }

  UpdateEmployee(item:any) {
    var employee = {
      employeeId: item.employeeId,
      empName: item.empName,
      empCode: item.empCode,
      employeeAge: item.employeeAge,
      employeeAddress: item.employeeAddress,
      empLocation: item.empLocation,
      empActive: item.empActive == 'true' ? true:false
    }

    var id = item.employeeId;
    this.empService.updateEmployee(id,employee).subscribe(res => {
      var closeModal = document.getElementById('add-edit-Modal-Close');
      if (closeModal) {
        closeModal.click();
      }

      var alert = document.getElementById('update-success-alert');
      if (alert) {
        alert.style.display = 'block';
      }

      setTimeout(function () {
        if (alert) {
          alert.style.display = 'none'
        }
      }, 4000);
    })
  }
}
