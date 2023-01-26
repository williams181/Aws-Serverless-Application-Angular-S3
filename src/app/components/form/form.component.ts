import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { interfaceApiService } from 'src/app/InterfaceApiService';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  title = 'aws-serverless-application-angular';

  arquivo: interfaceApiService ={id: 0,medico :"", CRM:0 ,hospital:"",
  CNPJ: "",
  paciente: "",
  convenio: "",
  acomodacao: "",
  procedimento: "" };
 


  constructor(private api: ApiServiceService){}
  ngOnInit(){

  }
 

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
    this.arquivo.id = this.arquivo.CRM
    console.log(this.arquivo);
    this.api.Salvar(this.arquivo)
    .then(ApiServiceService => console.log("adicionado!"))
    .catch(error => console.error(error));

  }

  Atualizar(){

    this.arquivo.id = this.arquivo.CRM
    this.api.Atualizar(this.arquivo)
    .then(ApiServiceService => console.log("atualizado!"))
    .catch(error => console.error(error));
  }

  Delete(id: number){
    this.api.Delete(id).then(res => console.log("removido com sucesso !"+res)).catch(error => console.error(error))
  }

}
