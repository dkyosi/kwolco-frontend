import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  
  productForm: FormGroup
  productData:any = {}
  isLoggin:any = false

  countries:any = []

  country_id:any
  constructor(private restProvider: RestService,private route: ActivatedRoute,
    public formBuilder: FormBuilder,private router:Router) {
    this.productForm = formBuilder.group({
      product_name: ['', Validators.compose([Validators.required])],
      tones: ['', Validators.compose([Validators.required])],
      price_per_kg: ['', Validators.compose([Validators.required])]
    })

   }

  ngOnInit(): void {
    this.getCountriesList();
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.getProduct(params['product'])
    });
  }

  getProduct(id:string){
    this.restProvider.mainGet('products/'+id).subscribe(res=>{
      let r:any = []
      r = res
      this.productData = r.product
      console.log(this.productData)
    })
  }

  selectionChanged($event:any){
    this.country_id = $event
    console.log($event)
  }

  updateProduct(){
 
    this.restProvider.mainPut('products/'+this.productData.product_id,this.productData).then(res=>{
      this.router.navigate(['/home'])
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
