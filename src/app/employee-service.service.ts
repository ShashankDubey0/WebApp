import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly employeeService = "https://localhost:7007/api";

  constructor(private httpClient: HttpClient) {
  }


  getEmployeeList(): Observable<any[]> {
    return this.httpClient.get<any>(this.employeeService + '/employees');
  }

  addEmployee(data: any) {
    return this.httpClient.post(this.employeeService + '/employees', data);
  }

  updateEmployee(id: number | string, data: any) {
    return this.httpClient.put(this.employeeService + `/employees/${id}`, data);
  }

  deleteEmployee(id: number | string) {
    return this.httpClient.delete(this.employeeService + `/employees/${id}`);
  }

}
