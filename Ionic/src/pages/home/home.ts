import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io'
import { Observable } from 'rxjs/observable'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

phase1Card:boolean = false;
phase2Card:boolean = false;
phase3Card:boolean = false;
phase4Card:boolean = false;
phase5Card:boolean = false

phase1Points =[0]
phase2Points =[0]
phase3Points =[0]
phase4Points =[0]

pointPhase1 = 0;
pointPhase2 = 0;
pointPhase3 = 0;
pointPhase4 = 0;

penaltys = [0,0,0,0,0]
penalty = 0
teamSelected = "SELECT";

goal = 0
safra =0
hamra = 0


penalitePhase1 = -5
rewardPhase1 = 75
robotInfonctionel = -50
rewardTropheeUp = 30
rewardTropheeDown = 35
rewardTropheeta7 = -10


khrajLkhat = -10
ma7alchLbab = -15
drapeauDialo = 30
drapeauMachiDialo = -30
intervention = -5


pointGoal = 20
pointSafra = -10


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

constructor(public navCtrl: NavController,private alertCtrl: AlertController, private socket:Socket) {
    this.socket.connect();
    let observable = new Observable(observ=>{
      this.socket.on('data jaaat',data=>{
        observ.next(data)
      })
    }).subscribe(data=>{
      console.log(data)
    })
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

 selectTeams(){
 
    let alert = this.alertCtrl.create({
      title: 'Select Team',
     
      buttons: [
        
        {
          text: 'Team1',
          role: 'team1',
          handler: () => {
            console.log('Team 1 selected');
            this.teamSelected = 'Team 1'
            this.teamData.name = 'Team 1'
            this.phase1Card = true
            this.phase5Card = false
            this.socket.emit('selectedTeam',this.teamData.name);
          }},
          {
            text: 'Team2',
            role: 'team2',
            handler: () => {
              console.log('Team 2 selected');
              this.teamSelected = 'Team 2'
              this.teamData.name = 'Team 2'
              this.phase1Card = true
              this.phase5Card = false
              this.socket.emit('selectedTeam',this.teamData);
            }},
            {
              text: 'Team3',
              role: 'team3',
              handler: () => {
                console.log('Team 3 selected');
                this.teamSelected = 'Team 3'
                this.teamData.name = 'Team 3'
                this.phase1Card = true
                this.phase5Card = false
                this.socket.emit('selectedTeam',this.teamData);
              },
        }
      ]
    });
    alert.present();
 
 }

 emitPhase1(){
  this.phase1Card = false
  this.phase2Card = true
 }

 emitPhase2(){
  this.phase2Card = false
  this.phase3Card = true
 }

 emitPhase3(){
  this.phase3Card = false
  this.phase4Card = true
 }

 emitPhase4(){
  this.phase4Card = false
  this.phase5Card = true
  
 }

 undoPhase1(){
   if(this.phase1Points.length>1)
      this.phase1Points.pop()
  this.teamData.game[this.teamData.gameNumbre].pointPhase1.points = this.phase1Points[this.phase1Points.length - 1]
 }

 undoPhase2(){
  if(this.phase2Points.length>1)
      this.phase2Points.pop()
  this.teamData.game[this.teamData.gameNumbre].pointPhase2.points  = this.phase2Points[this.phase2Points.length - 1]
 }

 undoPhase3(){
  if(this.phase3Points.length>1)
      this.phase3Points.pop()
  this.teamData.game[this.teamData.gameNumbre].pointPhase3.points  = this.phase3Points[this.phase3Points.length - 1]
 }

 undoPhase4(){
  if(this.phase4Points.length>1)
      this.phase4Points.pop()
  this.teamData.game[this.teamData.gameNumbre].pointPhase4.points  = this.phase4Points[this.phase4Points.length - 1]
 }

 
 scorePhase1(ev){
  switch (ev.target.value) {
      case "9as 7it":
      this.teamData.game[this.teamData.gameNumbre].pointPhase1.hitTheWall += this.penalitePhase1;
      this.pointPhase1 += this.penalitePhase1;
        break;
      case "Trophee up":
        this.teamData.game[this.teamData.gameNumbre].pointPhase1.tropheUp = true;
        this.pointPhase1 += this.rewardTropheeUp;
        break;
      case "Trophee t7et":
        this.teamData.game[this.teamData.gameNumbre].pointPhase1.tropheDown = true
        this.pointPhase1 += this.rewardTropheeDown;
        break;
      case "Trophee ta7":
        this.teamData.game[this.teamData.gameNumbre].pointPhase1.tropheDrop ++;
        this.pointPhase1 += this.rewardTropheeta7;
        break;
      case "intervention":
        this.teamData.game[this.teamData.gameNumbre].pointPhase1.intervention += this.intervention;
        break;
      case "Infonctionel":
        this.teamData.game[this.teamData.gameNumbre].pointPhase1.infonctionel = true;
        this.pointPhase1 = this.robotInfonctionel;
        break;
    default:
      break;
  }
  
  this.phase1Points.push(this.pointPhase1);
  this.teamData.game[this.teamData.gameNumbre].pointPhase1.points = this.phase1Points[this.phase1Points.length-1]
  this.sendData()
}
scorePhase2(ev){
  switch (ev.target.value) {
      case "khraj mn lkhat":
      this.teamData.game[this.teamData.gameNumbre].pointPhase2.outOfLine += this.khrajLkhat;
      this.pointPhase2 += this.khrajLkhat;
        break;
      case "ma7alch lbab":
      this.teamData.game[this.teamData.gameNumbre].pointPhase2.openDoor=true;
        this.pointPhase2 += this.ma7alchLbab;
        break;
      case "drapeau dialo":
      this.teamData.game[this.teamData.gameNumbre].pointPhase2.correctFlag += this.drapeauDialo;
      this.pointPhase2 += this.drapeauDialo;
        break;
      case "drapeau machi dialo":
      this.teamData.game[this.teamData.gameNumbre].pointPhase2.wrongFlag += this.drapeauMachiDialo;
      this.pointPhase2 += this.drapeauMachiDialo;
        break;
      case "intervention":
      this.teamData.game[this.teamData.gameNumbre].pointPhase2.intervention += this.intervention;
      this.pointPhase2 += this.intervention;
        break;
      case "Infonctionel":
      this.teamData.game[this.teamData.gameNumbre].pointPhase2.infonctionel = true
        this.pointPhase2 = this.robotInfonctionel;
        break;
    default:
      break;
  }
  
  this.phase2Points.push(this.pointPhase2);
  this.teamData.game[this.teamData.gameNumbre].pointPhase2.points = this.phase2Points[this.phase2Points.length-1]
  this.sendData()
}

scorePhase3(ev){
  switch (ev.target.value) {
      case "goal":
      this.teamData.game[this.teamData.gameNumbre].pointPhase3.goal++;
        this.goal ++;
        this.pointPhase3 += this.pointGoal;
        break;
      case "ssafra":
        this.safra++;
        this.teamData.game[this.teamData.gameNumbre].pointPhase3.yellowCard++;
        if(this.safra == 2){
          this.teamData.game[this.teamData.gameNumbre].pointPhase3.yellowCard = 0;
          this.teamData.game[this.teamData.gameNumbre].pointPhase3.redCard++;
          this.safra = 0;
          this.hamra ++;
        }
        this.pointPhase3 += this.pointSafra;
        break;
      case "7amra":
      this.teamData.game[this.teamData.gameNumbre].pointPhase3.redCard++;
        this.hamra ++;
        break;
      case "intervention":
      this.teamData.game[this.teamData.gameNumbre].pointPhase3.intervention += this.intervention;
        this.pointPhase3 += this.intervention;
        break;
      case "forfait":
        this.teamData.game[this.teamData.gameNumbre].pointPhase3.goal=0;
        this.teamData.game[this.teamData.gameNumbre].pointPhase3.forfait=true;
        this.pointPhase3 -= this.goal * 20;
        this.goal = 0;
        
        break;
    default:
      break;
  }
  this.teamData.game[this.teamData.gameNumbre].pointPhase3.points = this.pointPhase3
  this.sendData()
}

scorePhase4(ev){
  switch (ev.target.value) {
      case "goal":
        if(this.penalty<5){
          this.penaltys[this.penalty] = 1
          this.penalty++;
          this.pointPhase4 += this.pointGoal
        }
        break;
      case "notgoal":
        if(this.penalty<5){
          this.penaltys[this.penalty] = 0
          this.penalty++;
        }
        break;
      default:
      break;
  }
  this.teamData.game[this.teamData.gameNumbre].pointPhase4.goal = this.penaltys;
  this.teamData.game[this.teamData.gameNumbre].pointPhase4.points = this.phase4Points[this.phase4Points.length-1]
  this.sendData()
}

submit(){
  this.teamData.gameNumbre++
  this.teamSelected = "SELECT"
  this.phase5Card = false
  
  this.phase1Points =[0]
  this.phase2Points =[0]
  this.phase3Points =[0]
  this.phase4Points =[0]

  this.pointPhase1 = 0;
  this.pointPhase2 = 0;
  this.pointPhase3 = 0;
  this.pointPhase4 = 0;

  this.penaltys = [0,0,0,0,0]
  this.penalty = 0
  this.teamSelected = "SELECT";

  this.goal = 0
  this.safra =0
  this.hamra = 0
  this.sendData()
}

sendData(){
  this.socket.emit('teamdata',this.teamData);
}

}
