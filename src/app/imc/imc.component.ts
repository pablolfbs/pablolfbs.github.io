import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.css']
})
export class ImcComponent implements OnInit {

  peso: number | undefined
  altura: number | undefined
  resultado: number | undefined

  constructor() { }

  ngOnInit(): void {
  }

  calcularImc() {
    // IMC = Peso ÷ (Altura × Altura)
    this.resultado! = this.peso! / (this.altura! * this.altura!)
  }

}
