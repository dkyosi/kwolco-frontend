import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  productData:any = {}

  constructor(private restProvider: RestService,private route: ActivatedRoute,
    public formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getProduct(params['product'])
    });
  }

  getProduct(id:string){
    this.restProvider.mainGet('products/'+id).subscribe(res=>{
      let response:any = {}
      response = res
      this.productData = response.product
    })
  }

}
