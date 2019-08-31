import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import{ HttpClient } from '@angular/common/http';
import { Employee } from '../shared/employee.model';
import {Router} from '@angular/router'

declare var M:any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})


export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() 
  {
  this.resetForm();
  this.refreshList(); 
}

  
resetForm(form?:NgForm)
{
if(form)
 form.reset();
this.employeeService.selectedEmployee=
{
  _id:"",
  name:"",
  position:"",
  office:"",
  salary:null
} }


onSubmit(form:NgForm)
{
  if(form.value._id =="")
  {
  this.employeeService.postEmployee(form.value).subscribe(
      (res)=>
      {
        this.resetForm(form);
        this.refreshList();
        M.toast({html:'Save Sucessfully',classes:'roundded'});
        
      });
    }
 else
    {
      this.employeeService.putEmployee(form.value).subscribe(
        (res)=>
        {
          this.resetForm(form);
          this.refreshList();
          M.toast({html:'Save Update Sucessfully',classes:'roundded'});
        
        });
      
    } 
}

refreshList()
{
  this.employeeService.getEmployeeList().subscribe((res)=>{
            this.employeeService.employees=res as Employee[];
              //this.employeeService.employees=res as Employee[];
            
  });
                                            
}

inEdit(emp:Employee)
{
  this.employeeService.selectedEmployee=emp;
}

onDelete(_id:string,form:NgForm)
{
  if(confirm('Are Sure Want to Delete data this record ?') ==true)
  {
    this.employeeService.deleteEmployee(_id).subscribe((res)=>{
      this.refreshList();
      this.resetForm(form);
      M.toast({html:'Deleted Sucessfully',class:'roundded'})


    });
  }

}


}




