import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;
  isConfirm: boolean = false;

  

  forgotPass:boolean = false;
  newPass = ''
  constructor(private router: Router, private cognito: CognitoService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  this.user = {} as User;

  
  }

  public loginCognito(){
    if(this.user && this.user.email && this.user.password){
      this.cognito.signIn(this.user)
      .then(()=>
      this.router.navigate(['/list'])
      )
      .catch((error: any) =>{
        this.openSnackBar(error.message, "fechar")
      })
    }
    else{
      console.log("usuario não existe")
      this.openSnackBar("Email ou senha incorreto","dance");
    }
  }

  forgotPassClicked(){
    this.forgotPass = true
    
  }

  forgotPassword(){
    console.log("esqueci senha"+ this.user.email)

    if(this.user.email){
      this.cognito.forgotPass(this.user)
      .then(() => {
      console.log("verificado")
        this.isConfirm = true
        this.forgotPass = false
    })
      .catch((error: any) =>{
        this.openSnackBar(error.message, "fechar")
      })
    }
    else{
      this.openSnackBar("Usuario não existe!", "fechar");
    }
    
  }

  newPassword(){
    console.log(this.newPass.trim())
    console.log(this.user.code)
    if(this.user.code && this.newPass.trim().length != 0){
      this.cognito.forgotPassSubmit(this.user, this.newPass.trim())
      .then(()=>{
        this.openSnackBar("Senha atualizada", "fechar")
        this.isConfirm = false
      }).catch((error:any) =>{
        this.openSnackBar(error.message, "fechar")
      })
    }else{
      this.openSnackBar("coloque codigo valido", "fechar")
    }
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
