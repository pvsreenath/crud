import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private productService: ProductService, 
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any) { }
  freshnessList = ['Brand New', 'Refurbished','old']
  productForm !: FormGroup;
  buttonType = "Save"

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      date: ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],  
    })

    if(this.editData){
      this.buttonType = "Update"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }

    console.log(this.editData)
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        console.log(this.productForm.value)
        this.productService.postProduct(this.productForm.value)
        .subscribe(()=>{
          alert("product Added");
          this.productForm.reset();
          this.dialogRef.close('save')
        },
        (error)=>{
          alert("error");
        })
      }
    }
    else{
      this.updateProduct()
    }
  }
  updateProduct(){
    console.log(this.productForm.value,this.editData.id);
    this.productService.updateProduct(this.productForm.value,this.editData.id)
    .subscribe(()=>{
      alert("product updated")
      this.productForm.reset()
      this.dialogRef.close('update')
    });
  }

}
