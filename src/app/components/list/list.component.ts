import { Component, OnInit, BootstrapOptions } from '@angular/core';
import {Observable, of} from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { CognitoService } from 'src/app/services/cognito.service';
import { User } from 'src/app/models/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-overview-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  show: boolean = false;
  hiddenDelete: boolean = true;
  hiddenEdit: boolean = true;
  public Registro$!: Observable<any>;

 ngOnInit(){
  this.getUser()
   this.Registro$ =  this.api.Buscar(localStorage.getItem("token"));
   this.Registro$.subscribe(res=> {
    this.show = true;
  }); 
 }

 constructor(private api: ApiServiceService, private router: Router,
              private route: ActivatedRoute, 
              //private cognito: CognitoService,
              private snackBar: MatSnackBar){}

  private getUser(){
    const token = localStorage.getItem("token")
    const user = this.api.AuthenticateToken(token);
    if(token == null){
      this.router.navigate(['/login']);
    }else{
        user.then(res=> {
        console.log(res)
        if(res ==  "Unauthorized"){
          this.router.navigate(['/login']);
        }
      })
    }
  }

 BuscarPorId(id: String){
  this.hiddenEdit = false;
  this.router.navigate(['edit/',id])
  console.log('editar') 
 
}

 Delete(id: number){
   this.hiddenDelete = false;
   this.openSnackBar("apagando...","fechar")
   this.api.Delete(id).then(res =>{
     console.log("removido com sucesso !"+res)
     this.hiddenDelete = true;
     this.openSnackBar("apagado com secesso","fechar")
     this.Registro$ =  this.api.Buscar(localStorage.getItem("token"));
    }).catch(error => console.error(error))
   
 }

 openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}

}