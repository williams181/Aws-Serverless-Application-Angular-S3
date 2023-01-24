import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  data: any = [];

  // nomeHospital: string;
  // cnpj: string;
  // nomePaciente: string;
  // nomeProcedimento: number;
  // acomodacao: string;
  // nomeConvenio: string;
  // dataEvento: string;
  medico: any;
  // crm: number;
  // registroAnestesico: File;
  // mensagem: string;
  // errorMensagem: String;

  constructor(private http: HttpClient) { }

  onClickGETolaMundo() {
    // const headers = new HttpHeaders()
    // const headers = { '': '' };
    // const body = { title: '' };
    // const headers = ({"Access-Control-Allow-Origin": "*",});
    this.http.get<any>('/api/buscar/1').subscribe((data) => {
      this.medico = data;
    });
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
