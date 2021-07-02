import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showInputsTemperatura: boolean = false
  showInputsImc: boolean = false
  showInputsCadastroUsuario: boolean = false
  
  constructor() { }

  ngOnInit(): void { }

  showInputTemperatura() {
    this.showInputsTemperatura = !this.showInputsTemperatura ? true : false
  }

  showInputImc() {
    this.showInputsImc = !this.showInputsImc ? true : false
  }

  showInputCadastroUsuario() {
    this.showInputsCadastroUsuario = !this.showInputsCadastroUsuario ? true : false
  }

}
