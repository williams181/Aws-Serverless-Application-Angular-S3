import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {Amplify, Auth} from 'aws-amplify';



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
  constructor(private router: Router, private cognito: CognitoService,
              private snackBar: MatSnackBar, private api: ApiServiceService) { }

  ngOnInit(): void {
  this.user = {} as User;

  
  }

  // public loginCognito(){
  //   if(this.user && this.user.email && this.user.password){
  //     this.cognito.signIn(this.user)
  //     .then(()=>
  //     this.router.navigate(['/list'])
  //     )
  //     .catch((error: any) =>{
  //       this.openSnackBar(error.message, "fechar")
  //     })
  //   }
  //   else{
  //     console.log("usuario não existe")
  //     this.openSnackBar("Email ou senha incorreto","dance");
  //   }
  // }

  public loginCognito(){
    
    if(this.user && this.user.email && this.user.password){
      this.api.login(this.user)
      .subscribe((res: any)=>{
        if(res.accessToken != undefined){
          console.log(res.accessToken)
          localStorage.setItem("token",res.accessToken)
           console.log("token: "+localStorage.getItem("token"))
          this.router.navigate(['/list'])
        }else{
          this.openSnackBar("Email ou senha incorreto","fenhar");
        }
    })
      
    }
    else{
      console.log("usuario não existe")
      this.openSnackBar("Email ou senha incorreto","fenhar");
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
