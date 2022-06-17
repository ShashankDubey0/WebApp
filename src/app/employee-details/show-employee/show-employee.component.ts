import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../employee-service.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  employeeList$!: Observable<any[]>;
  modalTitle: string = '';
  activateAddEditEmployeeComponent: boolean = false;
  employee: any;
  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeList$ = this.empService.getEmployeeList();
  }

  modalAdd() {
    this.employee = {
      empId: 0,
      empName: null,
      empCode: null,
      employeeAge: 0,
      employeeAddress: null,
      empLocation: null,
      empActive: true
    }
    this.modalTitle = 'Add Employee';
    this.activateAddEditEmployeeComponent = true;
  }

  modalClose() {
    this.employeeList$ = this.empService.getEmployeeList();
    this.activateAddEditEmployeeComponent = false;
  }

  modalEdit(item: any) {
    this.employee = item;
    this.activateAddEditEmployeeComponent = true;
    this.modalTitle = 'Edit Employee';
  }

  deleteItem(item: any) {
    if (confirm(`Are your sure you want to delete employee ${item.employeeId}`)) {
      this.empService.deleteEmployee(item.employeeId).subscribe(res => {
        var closeModal = document.getElementById('add-edit-Modal-Close');
        if (closeModal) {
          closeModal.click();
        }

        var alert = document.getElementById('delete-success-alert');
        if (alert) {
          alert.style.display = 'block';
        }

        setTimeout(function () {
          if (alert) {
            alert.style.display = 'none'
          }
        }, 4000);
      });
    }
  }

}
