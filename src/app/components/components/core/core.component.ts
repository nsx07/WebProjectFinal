import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  public playerTurn = true;
  public status = {
    on : false,
    win : false,
    tie : false,
    winner : ``,
    reload : false
  }

  constructor() { }
  ngOnInit(): void {}

  public matrix : any[] = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]

  public insertIn = {
    put : (rest : any[], id : string) => {
      if (!this.matrix[rest[0]][rest[1]]) {
        this.matrix[rest[0]][rest[1]] = this.playerTurn ? 1 : 0;
        const element : HTMLElement = document.getElementById(id) || document.createElement('div');
        element.innerHTML = this.playerTurn ? '<i class="fa-solid fa-xmark fa-4x"></i>' : '<i class="fa-regular fa-circle fa-3x"></i>'
        this.playerTurn = !this.playerTurn
        const reload = this.win() || this.tie() ? setInterval(()=> {
          this.status.reload ? location.reload() : 0
        }, 500) : 0
        if (this.win()) {
          this.status.on = true
          this.status.win = true
        } else if (this.tie() ){
          this.status.on = true
          this.status.tie = true
          this.status.win = false
        console.log(this.status, this.tie(), this.win())
      }
    }
    }
  }

  public tie() {
    let arr : any[] = []
    this.matrix.forEach((row) => arr.push(row.filter((item : any ) => item === null)))
    arr = arr.flatMap(num => num)
    return arr.includes(null) ? false : true
  }

  public win() : boolean {
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
      if (remainRow.length === 3 ) {
        this.status.winner = remainRow[0]
        return true
      } else if ( remainColum.length === 3 ) {
        this.status.winner = remainColum[0]
        return true
      }
    }
    const remainDiagMain = mainDiagonal.filter((item => item === mainDiagonal[0] && item != null))
    const remainDiagSec = secDiagonal.filter((item => item === secDiagonal[0] && item != null))
    if (remainDiagMain.length === 3) {
      this.status.winner = remainDiagMain[0]
      return true
    } else if (remainDiagSec.length === 3) {
      this.status.winner = remainDiagSec[0]
      return true
    }
    return false
    // return remainDiagMain.length === 3 || remainDiagSec.length === 3 ? true : false
  }
}
