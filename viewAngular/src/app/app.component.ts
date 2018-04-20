import { Component } from '@angular/core';
import * as socketIo from 'socket.io-client'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  socket;
  teamData = {
  name: "",
  gameNumbre: 0,
  game: [{
    pointPhase1: {
      points      : 0,
      hitTheWall  : 0,
      tropheUp    : false,
      tropheDown  : false,
      tropheDrop  : 0,
      intervention: 0,
      infonctionel: false
    },
    pointPhase2: {
      points      : 0,
      outOfLine   : 0,
      correctFlag : 0,
      wrongFlag   : 0,
      openDoor    : false,
      intervention: 0,
      infonctionel: false
    },
    pointPhase3: {
      points      : 0,
      goal        : 0,
      yellowCard  : 0,
      redCard     : 0,
      intervention: 0,
      forfait     : false
    },
    pointPhase4: {
      points      : 0,
      goal        : [],
      intervention: 0,
      forfait     : false
    },
  },
  {
    pointPhase1: {
      points      : 0,
      hitTheWall  : 0,
      tropheUp    : false,
      tropheDown  : false,
      tropheDrop  : 0,
      intervention: 0,
      infonctionel: false
    },
    pointPhase2: {
      points      : 0,
      outOfLine   : 0,
      correctFlag : 0,
      wrongFlag   : 0,
      openDoor    : false,
      intervention: 0,
      infonctionel: false
    },
    pointPhase3: {
      points      : 0,
      goal        : 0,
      yellowCard  : 0,
      redCard     : 0,
      intervention: 0,
      forfait     : false
    },
    pointPhase4: {
      points      : 0,
      goal        : [],
      intervention: 0,
      forfait     : false
    },
  },
  {
    pointPhase1: {
      points      : 0,
      hitTheWall  : 0,
      tropheUp    : false,
      tropheDown  : false,
      tropheDrop  : 0,
      intervention: 0,
      infonctionel: false
    },
    pointPhase2: {
      points      : 0,
      outOfLine   : 0,
      correctFlag : 0,
      wrongFlag   : 0,
      openDoor    : false,
      intervention: 0,
      infonctionel: false
    },
    pointPhase3: {
      points      : 0,
      goal        : 0,
      yellowCard  : 0,
      redCard     : 0,
      intervention: 0,
      forfait     : false
    },
    pointPhase4: {
      points      : 0,
      goal        : [],
      intervention: 0,
      forfait     : false
    },
  },
  {
    pointPhase1: {
      points      : 0,
      hitTheWall  : 0,
      tropheUp    : false,
      tropheDown  : false,
      tropheDrop  : 0,
      intervention: 0,
      infonctionel: false
    },
    pointPhase2: {
      points      : 0,
      outOfLine   : 0,
      correctFlag : 0,
      wrongFlag   : 0,
      openDoor    : false,
      intervention: 0,
      infonctionel: false
    },
    pointPhase3: {
      points      : 0,
      goal        : 0,
      yellowCard  : 0,
      redCard     : 0,
      intervention: 0,
      forfait     : false
    },
    pointPhase4: {
      points      : 0,
      goal        : [],
      intervention: 0,
      forfait     : false
    },
  },
  {
    pointPhase1: {
      points      : 0,
      hitTheWall  : 0,
      tropheUp    : false,
      tropheDown  : false,
      tropheDrop  : 0,
      intervention: 0,
      infonctionel: false
    },
    pointPhase2: {
      points      : 0,
      outOfLine   : 0,
      correctFlag : 0,
      wrongFlag   : 0,
      openDoor    : false,
      intervention: 0,
      infonctionel: false
    },
    pointPhase3: {
      points      : 0,
      goal        : 0,
      yellowCard  : 0,
      redCard     : 0,
      intervention: 0,
      forfait     : false
    },
    pointPhase4: {
      points      : 0,
      goal        : [],
      intervention: 0,
      forfait     : false
    },
  }]
}
  constructor() {
    this.socket = socketIo('http://localhost:3001');
    let observableError = new Observable(observ=>{
      this.socket.on('teamSelected',data=>{
        observ.next(data)
      })
    }).subscribe(data=>{
      this.teamData = Object.assign(this.teamData , data)
      console.log(data)
    })

    let observableData = new Observable(observ=>{
      this.socket.on('teamData',data=>{
        observ.next(data)
      })
    }).subscribe(data=>{
      console.log(data)
    })
  }
  title = 'app';
}
