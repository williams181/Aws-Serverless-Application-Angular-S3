import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { AppRoutingModule} from 'src/app/app-routing.module';
import { interfaceApiService } from 'src/app/InterfaceApiService';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers:[ApiServiceService]
})
export class FormComponent implements OnInit{
  title = 'aws-serverless-application-angular';
  show = true 
  att = true
 
  form!: FormGroup;
  submited =  false


  constructor(private api: ApiServiceService,  private router: Router, private fb: FormBuilder, private route: ActivatedRoute){ }
 
  ngOnInit(): void{

    this.route.params.subscribe(
      ((params : any) =>{
          const id = params['id']
          console.log(id)
          
          if(id != undefined){
            this.att =false
            this.api.BuscarPorId(id).subscribe(res =>{
            this.Editar(res.Arquivos);
            console.log(res.Arquivos)
            this.att =true })
          }
          
      })
    )

    this.form = this.fb.group({
      id: null,
      medico :['', Validators.required],
      CRM:[0, Validators.required],
      hospital:['', Validators.required],
      CNPJ: ['', Validators.required],
      paciente: ['', Validators.required],
      convenio: ['', Validators.required],
      acomodacao: ['', Validators.required],
      procedimento: ['', Validators.required]
    })
  
  
  }

  Editar(arquivo: any){
    console.log("editar", arquivo)
    this.form.patchValue({
      id: arquivo.id,
      medico: arquivo.medico,
      CRM:arquivo.CRM,
      hospital:arquivo.hospital,
      CNPJ: arquivo.CNPJ,
      paciente: arquivo.paciente,
      convenio: arquivo.convenio,
      acomodacao: arquivo.acomodacao,
      procedimento: arquivo.procedimento

    })
  }


  hasError(field: string){
    return this.form.get(field)?.errors
    
  }
 
  Validador(){
    this.submited =true
    this.show = false
    if(this.form.value.id == null){
      this.Salvar()
    }else{
      this.Atualizar()
    }
  }
 

  Salvar(){

    if(this.form.valid){
      console.log("valido")
      console.log(this.form.value)
      this.api.Salvar(this.form.value)
      .then(ApiServiceService =>  {
      console.log("adicionado!")
      this.router.navigate(['/list']);
      })
      .catch(error => console.error(error));
    
    }else{
      console.log("invalido")
      this.show = true
    }
  }


  Atualizar(){
    
    if(this.form.valid){
      console.log(this.form.value)
      this.api.Atualizar(this.form.value)
      .then(ApiServiceService => {
        console.log("atualizado!")
        this.router.navigate(['/list']);
      })
      .catch(error => console.error(error));
    }else{
      this.show = true
      console.log("invalido")
    }
  }

  Delete(id: number){
    this.api.Delete(id).then(res => console.log("removido com sucesso !"+res)).catch(error => console.error(error))
  }

}


