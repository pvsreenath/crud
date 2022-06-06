import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  postProduct(product: any){
    return this.http.post<any>("http://localhost:3000/products",product);
  }

  getProducts() {
    return this.http.get<any>("http://localhost:3000/products");
  }

  updateProduct(data:any, id:number) {
    return this.http.put<any>("http://localhost:3000/products/"+id,data);
  }

  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/products/"+id)
  }
}
