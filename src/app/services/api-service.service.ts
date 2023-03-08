import { EventEmitter, Injectable, Output } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { interfaceApiService } from '../models/InterfaceApiService';
import { Observable, take } from 'rxjs';
import { FormComponent} from 'src/app/components/form/form.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';


interface Response { results: interfaceApiService[] }
@Injectable({
  providedIn: 'root'
})


export class ApiServiceService {
   ngModel =  new EventEmitter<interfaceApiService>();
   static arquivo =  new EventEmitter<interfaceApiService>();
   //private const URL =  "https://ojviia7zik.execute-api.us-east-1.amazonaws.com/Prod/"
  

  constructor(private httpCliente: HttpClient, private router: Router) { }

// CRUD API
  AuthenticateToken(url: any){
    let headers = new HttpHeaders()
    .append('token', url);
    return this.httpCliente.get("/api/authenticatetoken/",{ headers: headers }).toPromise().catch((err: HttpErrorResponse) => {
      // simple logging, but you can do a lot more, see below
      console.log("error")
      console.error('An error occurred:', err.error);
      return "undefined"
    });

  }

  Buscar(url: any): Observable<any>{
    console.log(url)
    let headers = new HttpHeaders()
    .append('token', url);
    return this.httpCliente.get<any>("/api/arquivo/",{ headers: headers });
  }

  BuscarPorId(id: any ){

  return this.httpCliente.get<any>(`/api/arquivo/${id}`);
   
  }

  Salvar(arquivo: interfaceApiService){
    return this.httpCliente.post<interfaceApiService>(`/api/cadastro`,arquivo).toPromise();
    
  }

  Atualizar(arquivo: interfaceApiService){
    return this.httpCliente.put<interfaceApiService>(`/api/atualizar`,arquivo).toPromise();
  }

  Delete(id: number){
    return this.httpCliente.delete(`/api/delete/${id}`).toPromise()
  }

// Autenticação com o Cognito

Criar(arquivo: User){
  
  return this.httpCliente.post<User>(`/api/authenticationcreate`,arquivo).toPromise();
  
}

confirmar(arquivo: User){

  return this.httpCliente.post<User>(`/api/authenticationconfirm`,arquivo).toPromise();
  
}


login(arquivo: User){
  console.log("logando")
  return this.httpCliente.post<any>(`/api/authenticationlogin`,arquivo);
  
}

forgotPassword(arquivo: User){
  return this.httpCliente.post<User>(`/api/authenticationforgot`,arquivo);
  
}

forgotConfirmPassword(arquivo: User){
  return this.httpCliente.post<User>(`/api/authenticationconfirmpassword`,arquivo).toPromise();
  
}

}
