import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  productForm: FormGroup
  productData:any
  isLoggin:any = false

  countries:any = []

  country_id:any

  constructor(private restProvider: RestService,
    public formBuilder: FormBuilder,private router:Router) { 
      this.productForm = formBuilder.group({
        product_name: ['', Validators.compose([Validators.required])],
        tones: ['', Validators.compose([Validators.required])],
        price_per_kg: ['', Validators.compose([Validators.required])]
      })
    }

  ngOnInit(): void {
    this.getCountriesList()
  }

  selectionChanged($event:any){
    this.country_id = $event
    console.log($event)
  }

  createProduct(){
    this.isLoggin = true
    this.productData = {
      'product_name':this.productForm.value.product_name,
      'tones':this.productForm.value.tones,
      'price_per_kg':this.productForm.value.price_per_kg,
      'country_id':this.country_id.toString()
    }

    console.log(this.productData)

    this.restProvider.mainPost('products/create',this.productData).then(res=>{
      this.isLoggin = false
      console.log(res)
      this.router.navigate(['/home'])

    }).catch(err=>{
      console.log(err)
    })

  }

  getCountriesList(){
    this.restProvider.mainGet('countries').subscribe(res=>{
      let response:any = []
      response = res
      this.countries = response.countries
      console.log(this.countries)
    })
}

}
