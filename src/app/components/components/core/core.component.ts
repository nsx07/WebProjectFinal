import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}


  /*
  null - initial state
  1 - X
  0 - O
  */
  public matrix : any[] = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]

  public playerTurn = true;
  public markerTurn = this.playerTurn ? '<i class="fa-solid fa-xmark fa-4x"></i>' : '<i class="fa-regular fa-circle fa-3x"></i>'
  public tempVar! : any[]

  public insertIn = {

    put : (rest : any[], id : string) => {
      if (!this.matrix[rest[0]][rest[1]]) {
        this.tempVar = [rest, id]
        this.matrix[rest[0]][rest[1]] = this.playerTurn ? 1 : 0;
        const element : HTMLElement = document.getElementById(id) || document.createElement('div');
        element.innerHTML = this.playerTurn ? '<i class="fa-solid fa-xmark fa-4x"></i>' : '<i class="fa-regular fa-circle fa-3x"></i>'
        this.playerTurn = !this.playerTurn
        this.showWinner()
        console.log(this.matrix, this.playerTurn);
      }
    },
    back : () => {
      const position = this.tempVar[0]
      this.matrix[position[0]][position[1]] = null
      const element : HTMLElement = document.getElementById(this.tempVar[2]) || document.createElement('div');

    }
  }
  public showWinner() {
    for (let i = 0; i < this.matrix.length; i++) {
      const linha : any[] = this.matrix[i]
      const remain = linha.filter((item => item === linha[0] && item !== null))
      !remain ? console.log('Nothing') : remain.length === 3 ? console.log('Winner') : console.log('Nothing')
      console.log(linha, remain)
    }

  }
}
