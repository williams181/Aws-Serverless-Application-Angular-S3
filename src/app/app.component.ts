import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from './api-service.service';
import { interfaceApiService } from './InterfaceApiService';
import {of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
 
  title = 'aws-serverless-application-angular';


  Registro: Array<any> = new Array();

  ngOnInit(){
      this.api.Buscar().subscribe((res: any)=>
        {this.Registro = res;
        console.log(this.Registro)
        console.log(typeof res)}, error => {console.log("error ao listar", error)})
  }

  constructor(private api: ApiServiceService){}

}