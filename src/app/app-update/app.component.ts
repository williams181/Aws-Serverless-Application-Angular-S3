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

  ngOnInit() {      
      // Simple POST request with a JSON body and response type <any>
      this.http.post<Article>('http://person/create', { title: 'Angular POST Request Example' }).subscribe(data => {
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
