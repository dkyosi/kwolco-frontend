import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  products:any = []

  constructor(private router:Router,private restProvider:RestService) { }

  ngOnInit(): void {

    this.getProducts()
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

 

  getProducts(){
    this.restProvider.mainGet('products').subscribe(res=>{
      let response:any = []
      response = res
      this.products = response.products
      console.log(this.products)

    })
  }

  showProduct(product:any){
    console.log(product)
    const queryParams = { product: product.product_id };
     this.router.navigate(['/show'], { queryParams: queryParams });
  }

  editProduct(product:any){
     const queryParams = { product: product.product_id };
     this.router.navigate(['/edit'], { queryParams: queryParams });
  }

  deleteProduct(product:any){
    this.restProvider.deleteMapping('products/'+product.product_id).subscribe(res=>{
      console.log(res)
      this.redirectTo('home')
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

  addProduct(){
    this.router.navigate(['/add'])
  }

}
