import { Injectable } from '@angular/core';
import { Department } from './models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departments : Department[] = [
    {id:1,name:'Clothing'},
    {id:2,name:'Books'},
    {id:3,name:'Eletronics'},
    {id:4,name:'Computers'}
  ];

  private nextId:number = 5;

  constructor() { }


  getDepartments():Department[]{
    return this.departments;
  }

  addDepartment(d: Department){
    this.departments.push({...d,id:this.nextId++});
    console.log(this.departments);
  }

  getDepartmentById(id:number):Department{
    return this.departments.find((d)=> d.id == id);
    }
}
