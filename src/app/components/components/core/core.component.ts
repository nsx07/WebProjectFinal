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

  public matrix = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]

  public markerTurn! : string

  public movements = {
    option : this.markerTurn == 'X' ?  true : false ,
    putX :  'fa-solid fa-xmark fa-4x',
    putO :  'fa-regular fa-circle fa-3x'
  }

  public insertIn = {
    AA : (...rest : any[]) => {
      this.matrix[0][0] = 1
    },
    AB : (...rest : any[]) => {
      this.matrix[0][1] = 1
    },
    AC : (...rest : any[]) => {
      this.matrix[0][2] = 1
    },
    BA : (...rest : any[]) => {
      this.matrix[1][0] = 1
    },
    BB : (...rest : any[]) => {
      this.matrix[1][1] = 1
    },
    BC : (...rest : any[]) => {
      this.matrix[1][2]
    },
    CA : (...rest : any[]) => {
      this.matrix[2][0] = 1
    },
    CB : (...rest : any[]) => {
      this.matrix[2][1]
    },
    CC : (...rest : any[]) => {
      this.matrix[2][2]
    },
  }
}
