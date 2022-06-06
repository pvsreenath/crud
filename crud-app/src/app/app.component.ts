import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './dialogs/add-product/add-product.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProductService } from './services/product.service';
import { KnockoutComponent } from './knockout/knockout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'crud-app';
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price', 'comment','action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private productService: ProductService){

  }

  ngOnInit() {
    this.getProducts();
  }

  onClick(){
    this.dialog.open(AddProductComponent, {
      width: '50%'
    }).afterClosed().subscribe((value)=>{
      if(value=='save'){
        this.getProducts()
      }
    });

  }

  getProducts(){
    this.productService.getProducts()
    .subscribe((data)=>{
      console.log(data)
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  editProduct(row:any){
    this.dialog.open(AddProductComponent,{
      width: '50%',
      data: row
    }).afterClosed().subscribe((data)=>{
      if(data=='update'){
        this.getProducts()
      }
    })
  }

  deleteProduct(id:number){
    this.dialog.open(KnockoutComponent).afterClosed()
    .subscribe((data)=>{
      if(data=='Yes'){
        this.productService.deleteProduct(id).subscribe((data)=>{
          alert("product has been deleted");
          this.getProducts()
        })
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
