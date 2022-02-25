import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private router: Router,private rest:RestService) {}
  
  ngOnInit(): void {
    let token = localStorage.getItem('STORAGE_KEY_TOKEN')
    if(token){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
