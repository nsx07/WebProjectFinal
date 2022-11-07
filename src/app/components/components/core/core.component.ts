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

  public matrix : any[] = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]

  public playerTurn = true;
  public tempVar! : any[]
  public insertIn = {
    put : (rest : any[], id : string) => {
      if (!this.matrix[rest[0]][rest[1]]) {
        this.tempVar = [rest, id]
        this.matrix[rest[0]][rest[1]] = this.playerTurn ? 1 : 0;
        const element : HTMLElement = document.getElementById(id) || document.createElement('div');
        element.innerHTML = this.playerTurn ? '<i class="fa-solid fa-xmark fa-4x"></i>' : '<i class="fa-regular fa-circle fa-3x"></i>'
        this.playerTurn = !this.playerTurn
        console.log(this.matrix, this.playerTurn);
        if (this.showWinner()) {
          location.reload()
        }
      }
    },
    back : () => {}
  }

  public showWinner() : boolean {
    const mainDiagonal : any[] = []
    const secDiagonal : any[] = []
    for (let i = 0; i < this.matrix.length; i++) {
      const linha : any[] = this.matrix[i]
      const remainRow = linha.filter((item => item === linha[0] && item !== null))
      let colum : any[] = []
      for (let j = 0; j < 3; j++) colum.push(this.matrix[j][i])
      const remainColum = colum.filter((item => item === colum[0] && item !== null))
      mainDiagonal.push(this.matrix[i][i])
      secDiagonal.push(this.matrix[i][this.matrix.length-1-i])
      if (remainRow.length === 3 || remainColum.length === 3 ) return true
    }
    const remainDiagMain = mainDiagonal.filter((item => item === mainDiagonal[0] && item != null))
    const remainDiagSec = secDiagonal.filter((item => item === secDiagonal[0] && item != null))
    return remainDiagMain.length === 3 || remainDiagSec.length === 3 ? true : false
  }
}
