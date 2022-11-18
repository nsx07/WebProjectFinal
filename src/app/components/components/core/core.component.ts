import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {

  info = false
  lastPlay : any[] = [];
  playerTurn = true;
  status = {
    on : false,
    win : false,
    tie : false,
    winner : ``,
    reload : false
  }

  constructor() { }

  matrix : any[] = [
    null,null,null,
    null,null,null,
    null,null,null
  ]

  reload() {
    this.status.reload = false
    this.status.on = false
    this.status.tie = false
    this.status.win = false
    setTimeout(() => this.refresh(), 500)
  }

  insertIn (loc : number) {
    if (this.matrix[loc] === null) {
      this.matrix[loc] = this.playerTurn ? 1 : 0;
      const element = (document.getElementById(loc.toString()) || document.createElement('div'))
          .innerHTML = this.playerTurn
          ? '<i class="fa-solid fa-xmark fa-4x"></i>'
          : '<i class="fa-regular fa-circle fa-3x"></i>'

      this.playerTurn = !this.playerTurn
      this.lastPlay = [loc, loc.toString()]
      if (this.win()) {
        this.status.on = true
        this.status.win = true
      } else if (this.tie() ){
        this.status.on = true
        this.status.tie = true
        this.status.win = false
      }
    }
  }

  undo() {
      let loc = this.lastPlay[0]
      this.matrix[loc] = null
      const element = (document.getElementById(this.lastPlay[1]) || document.createElement('div')).innerHTML = "";
  }

  refresh() {
    for ( let i = 0; i < this.matrix.length; i++)
    {
      this.matrix[i] = null
      let element = (document.getElementById(i.toString()) || document.createElement('div')).innerHTML = ""
    }
  }

  tie() : boolean {
    return this.matrix.includes(null) ? false : true
  }

  win() : boolean {
    let matrix = [
      [this.matrix[0], this.matrix[1], this.matrix[2]],
      [this.matrix[3], this.matrix[4], this.matrix[5]],
      [this.matrix[6], this.matrix[7], this.matrix[8]]
    ]

    const mainDiagonal : any[] = []
    const secDiagonal : any[] = []
    for (let i = 0; i < matrix.length; i++) {
      const linha : any[] = matrix[i]
      const remainRow = linha.filter((item => item === linha[0] && item !== null))
      let colum : any[] = []
      for (let j = 0; j < 3; j++) colum.push(matrix[j][i])
      const remainColum = colum.filter((item => item === colum[0] && item !== null))
      mainDiagonal.push(matrix[i][i])
      secDiagonal.push(matrix[i][matrix.length-1-i])
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
  }
}
