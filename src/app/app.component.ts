import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'AWS';

  idCrm: any;
  nome: any;
  sobreNome: any;
  endereco: any;
  idade: any;

  constructor(private http: HttpClient) { }

  onClickGETolaMundo() {
    // const headers = new HttpHeaders()
    // const headers = { '': '' };
    // const body = { title: '' };
    this.http.get<any>('https://9pe3b80wee.execute-api.us-east-1.amazonaws.com/prod/buscar/1').subscribe(data => { console.log(data) });
    
  }

  ngOnInit() {      
      // Simple POST request with a JSON body and response type <any>
      this.http.post<Article>('http://person/createhttp://person/create', { title: 'Angular POST Request Example' }).subscribe(data => {
          this.idCrm = data.idCrm;
          this.nome = data.nome;
          this.sobreNome = data.sobreNome;
          this.endereco = data.endereco;
          this.idade = data.idade;
      })
  }

}

interface Article {
  idCrm: number;
  nome: string;
  sobreNome: string;
  endereco: string;
  idade: number;
}
