import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'AWS';

  id: any;
  nome: any;
  sobreNome: any;
  endereco: any;
  idade: any;

  constructor(private http: HttpClient) { }


  onClickGETData() {
    // const headers = new HttpHeaders()
    // const headers = { '': '' };
    // const body = { title: '' };
    // const headers = ({"Access-Control-Allow-Origin": "*",});
    const headers = ({"Content-Type": "application/json", "Accept": "application/json"});
    this.http.get<any>('/api/buscar/1', { headers }).subscribe(data => {console.log(data)});
  }

  // onClickGETolaMundo() {
  //   // const headers = new HttpHeaders()
  //   // const headers = { '': '' };
  //   // const body = { title: '' };
  //   // const headers = ({"Access-Control-Allow-Origin": "*",});
  //   this.http.get<any>('/api/buscar/1').subscribe(data => { console.log(data) });
    
  // }

  // ngOnInit() {      
  //     // Simple POST request with a JSON body and response type <any>
  //     const body = { title: '' };
  //     this.http.post<Article>('/api', { body }).subscribe(data => {
  //         this.id = data.id;
  //         this.medico = data.medico;
  //         this.sobreNome = data.sobreNome;
  //         this.endereco = data.endereco;
  //         this.idade = data.idade;
  //     })
  // }

}

interface Article {
  id: number,
  medico: String,
  CRM: number,
  hospital: String,
  CNPJ: String,
  paciente: String,
  convenio: String,
  acomodacao: String,
  procedimento: String
}
