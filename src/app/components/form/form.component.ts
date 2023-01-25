import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  data: any;

  nomeHospital: any;
  cnpj: any;
  nomePaciente: any;
  nomeProcedimento: any;
  acomodacao: any;
  nomeConvenio: any;
  dataEvento: any;
  medico: any;
  crm: any;
  registroAnestesico: any;
  mensagem: any;
  errorMensagem: any;

  constructor(private http: HttpClient) { }

  // onClickGETData() {
  //   // const headers = new HttpHeaders()
  //   // const headers = { '': '' };
  //   // const body = { title: '' };
  //   // const headers = ({"Access-Control-Allow-Origin": "*",});
  //   this.http.get<any>('/api/buscar/1').subscribe(data => console.log(data));
  // }

  onClickRegister() {          
    this.http.post<Article>('/api/criar', { title: 'Angular POST Request Example' }).subscribe(data => {
        this.medico = data.medico;
        this.nomePaciente = data.nomePaciente;
        this.cnpj = data.cnpj;
        this.nomeProcedimento = data.nomeProcedimento;
        this.crm = data.crm;
        this.acomodacao = data.acomodacao;
        this.nomeConvenio = data.nomeConvenio;
        this.nomeHospital = data.nomeHospital;
    })
}


}

interface Article {
  nomeHospital: string;
  cnpj: string;
  nomePaciente: string;
  nomeProcedimento: number;
  acomodacao: string;
  nomeConvenio: string;
  dataEvento: string;
  medico: string;
  crm: number;
  mensagem: String;
}
