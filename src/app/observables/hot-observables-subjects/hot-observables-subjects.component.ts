import { Component, OnInit } from '@angular/core';
import { ConnectableObservable, Observable, Observer, Subject } from 'rxjs';

import {publish, refCount, share} from 'rxjs/operators'

@Component({
  selector: 'app-hot-observables-subjects',
  templateUrl: './hot-observables-subjects.component.html',
  styleUrls: ['./hot-observables-subjects.component.css']
})
export class HotObservablesSubjectsComponent implements OnInit {

  n: number = 0;

  n1: number = 0;
  n2: number = 0;
  s1:string = "";
  s2: string = "";

  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {

    this.myObservable = new Observable((observer:Observer<number>)=>{
      let i : number = 0;
      console.log('%c Observable created','background: #cccccc; color: #ff0000');
      setInterval(()=>{
        i++;
        console.log('%c i = '+ i,'background: #cccccc; color: #ff0000');

        (i==100) ? observer.complete() : observer.next(i); 
        
      },1000);

    });

    //this.usingSubjects();
    //this.usingPublish();
    this.usingShare();
  }


  usingShare(){
    
    //cria o observable quando o primeiro subscribe é feito
    const multicasted = this.myObservable.pipe(share());
    

    //subscriber 1
    //todos os outros subscribes são feitos no subject
    this.s1 = 'waiting for interval..';
    setTimeout(()=>{
      multicasted.subscribe((_n)=>{
        this.n1 = _n;
        this.s1 = 'OK';
      });
    },2000);

    //subscriber 2
    this.s2 = 'waiting for interval..';
    setTimeout(()=>{
      multicasted.subscribe((_n)=>{
        this.n2 = _n;
        this.s2 = 'OK';
      });
    },4000);


  }



  usingPublish(){
    //observable gera os dados
    // pipe aplica alguns tipo de operadores aos dados
    //filtro

    //publica o observable como um subject
    //publish somente publica o que o observable gera
    //refCount conecta o publish ao observable
    //const multicasted = this.myObservable.pipe(publish(), refCount());

    const multicasted :ConnectableObservable<number> = this.myObservable.pipe(publish()) as ConnectableObservable<number>;
    //inicia a conexão com o observable nesse momento 
    multicasted.connect();

    //subscriber 1
    //todos os outros subscribes são feitos no subject
    this.s1 = 'waiting for interval..';
    setTimeout(()=>{
      multicasted.subscribe((_n)=>{
        this.n1 = _n;
        this.s1 = 'OK';
      });
    },2000);

    //subscriber 2
    this.s2 = 'waiting for interval..';
    setTimeout(()=>{
      multicasted.subscribe((_n)=>{
        this.n2 = _n;
        this.s2 = 'OK';
      });
    },4000);


  }


  usingSubjects(){

    const subject = new Subject<number>();
    //criamos apensa uma vez o produtor
    this.myObservable.subscribe(subject);

    
    //subscriber 1
    //todos os outros subscribes são feitos no subject
    this.s1 = 'waiting for interval..';
    setTimeout(()=>{
      subject.subscribe((_n)=>{
        this.n1 = _n;
        this.s1 = 'OK';
      });
    },2000);

    //subscriber 2
    this.s2 = 'waiting for interval..';
    setTimeout(()=>{
      subject.subscribe((_n)=>{
        this.n2 = _n;
        this.s2 = 'OK';
      });
    },4000);
  }

}
