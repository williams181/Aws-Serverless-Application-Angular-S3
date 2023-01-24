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

  tabela: Array<interfaceApiService> = new Array();

  ngOnInit(){
      this.api.Buscar().subscribe((res)=>
        {this.tabela = res;
        console.log(this.tabela)}, error => {console.log("erroa ao listar", error)})
  }

  constructor(private api: ApiServiceService){}

}
