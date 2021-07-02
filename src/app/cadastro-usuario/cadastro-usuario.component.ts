import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  formulario = this.formBuilder.group({
    nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    cpf: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]]
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { }

  submit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value)
      this.resetar()
    } else {
      console.log(this.formulario)
    }
  }

  resetar() {
    this.formulario.reset()
  }

  isInvalid(campo: string) {
    return !this.formulario.controls[campo]?.valid
  }

  isUntoched(campo: string) {
    return !this.formulario.controls[campo]?.pristine
  }
  
  aplicaCssErro(campo: string) {
    return { 'input-error': this.isInvalid(campo) && this.isUntoched(campo) }
  }

  emailInvalido() {
    return this.formulario.controls.email.errors && this.isUntoched('email')
  }

  formularioInvalido() {
    return !this.formulario.valid
  }

}
