import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import{ Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs';
//import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import { from } from 'rxjs';
import{Employee} from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  

selectedEmployee:Employee;

employees:Employee[];

private baseURL='http://localhost:5000/create';//save data
private baseURLget='http://localhost:5000/getall';//show all data
private baseURLput='http://localhost:5000/update';//edit data
private baseURLdelete='http://localhost:5000/deleteuser';//delete data


constructor(private http:HttpClient) { }

postEmployee(emp:Employee)
{

  console.log(emp);
  return this.http.post(this.baseURL,emp);


}

getEmployeeList()
{

  return this.http.get(this.baseURLget);
  
}

putEmployee(emp:Employee)
{
  return this.http.put(this.baseURLput + `/${emp._id}`,emp)
}

deleteEmployee(_id:string)
{
  return this.http.delete(this.baseURLdelete + `/${_id}`);
}

}
