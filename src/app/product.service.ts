import { Injectable,EventEmitter } from '@angular/core';
import { DepartmentService } from './department.service';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataFromServer:any[] = [
    {id:1, name: "Laptop",department_id:4, price:40, description:'Laptop Desciption'},
    {id:2, name: "Shirt",department_id:1, price:10, description:'Shirt Desciption'},
    {id:3, name: "Polo",department_id:1, price:50, description:'Polo Desciption'},
    {id:4, name: "Mouse",department_id:3, price:40, description:'Mouse Desciption'}
  ];

  private products: Product[] = [];
  private nextId:number;
  //responsável por emitir um evento avisando que foi feita uma inserção
  onNewProduct = new EventEmitter<Product>();

  constructor(
    private departmentService: DepartmentService) { 

      for(let p of this.dataFromServer){
        this.products.push({
          id:p.id,
          name:p.name,
          description:p.description,
          price:p.price,
          department:this.departmentService.getDepartmentById(p.id)
        });
        this.nextId = p.id+1;
      }
  }

  getProducts():Product[]{
    return this.products;
  }

  addProduct(p:Product){
    let prod = {id:this.nextId++,...p};
    this.products.push(prod);
    console.log(this.products);
    this.onNewProduct.emit(prod);
  }




}
