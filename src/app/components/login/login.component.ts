import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;
  isConfirm: boolean = false;
  show = true 
  isForgot = true 
  isForgotConfirm = true

  forgotPass:boolean = false;
  newPass = ''
  constructor(private router: Router, private cognito: CognitoService,
              private snackBar: MatSnackBar, private api: ApiServiceService) { }

  ngOnInit(): void {
  this.user = {} as User;

  }

  public loginCognito(){
    
    if(this.user && this.user.email && this.user.password){
      this.show=false
      this.api.login(this.user)
      .subscribe((res: any)=>{
        if(res.accessToken != undefined){
          localStorage.setItem("token",res.accessToken)
          this.router.navigate(['/form'])
        }else{
          this.show=true
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
    this.isForgot = false
    if(this.user.email){
      this.api.forgotPassword(this.user)
      .subscribe((res) => {
        this.openSnackBar("verificado", "fechar")
        console.log(res)
       
        this.isConfirm = true
        this.forgotPass = false
    })

    }
    else{
      this.isForgot = true
      this.openSnackBar("Usuario não existe!", "fechar");
    }
    
  }

  newPassword(){
    console.log(this.user.password)
    console.log(this.user.code)
    this.isForgotConfirm = false
    if(this.user.code && this.user.password.length != 0){
      this.api.forgotConfirmPassword(this.user)
      .then(()=>{
        this.openSnackBar("Senha atualizada", "fechar")
        this.isConfirm = false
      }).catch((error:any) =>{
        this.isForgotConfirm = true
        this.openSnackBar(error.message, "fechar")
      })
    }else{
      this.isForgotConfirm = true
      this.openSnackBar("coloque codigo valido", "fechar")
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
