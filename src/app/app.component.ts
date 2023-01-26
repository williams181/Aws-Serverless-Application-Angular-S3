import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from './api-service.service';
import { interfaceApiService } from './InterfaceApiService';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
 
  title = 'aws-serverless-application-angular';


 public Registro$!: Observable<any>;

  ngOnInit(){
    this.Registro$ =  this.api.Buscar();
  }

  constructor(private api: ApiServiceService){}

  Delete(id: number){
    this.api.Delete(id).then(res => console.log("removido com sucesso !"+res)).catch(error => console.error(error))
  }

}