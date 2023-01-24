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


  tabela: any =[];

  ngOnInit(): void {
      this.api.Buscar().subscribe((res)=>
        {this.tabela = res;
        console.log(this.tabela)} )
  }

  constructor(private api: ApiServiceService){}
 

  // Buscar(){
  //   this.api.Buscar()
  //   .then(ApiServiceService  => console.log(ApiServiceService))
  //   .catch(error => console.error(error))
  // }

  BuscarPorId(){
    this.api.BuscarPorId(8)
    .then(ApiServiceService => console.log(ApiServiceService))
    .catch(error => console.error(error))
  }

  Salvar(){
    const arquivo: interfaceApiService = {
      id: 9,
      medico: "jow",
      CRM: 2323423,
      hospital: "clinicas",
      CNPJ: "23123423",
      paciente: "vitu",
      convenio: "sus",
      acomodacao: "cama",
      procedimento: "injeção"
    };

    this.api.Salvar(arquivo)
    .then(ApiServiceService => console.log("adicionado!"))
    .catch(error => console.error(error));

  }

  Atualizar(){
    const arquivo: interfaceApiService = {
      id: 1,
      medico: "jow",
      CRM: 2323423,
      hospital: "clinicas",
      CNPJ: "23123423",
      paciente: "vitu",
      convenio: "sus",
      acomodacao: "cama",
      procedimento: "injeção"
    };

    this.api.Atualizar(arquivo)
    .then(ApiServiceService => console.log("adicionado!"))
    .catch(error => console.error(error));
  }

  Delete(){
    this.api.Delete(1).then(res => ("removido com sucesso !"+res)).catch(error => console.error(error))
  }

}