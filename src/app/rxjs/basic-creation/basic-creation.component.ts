import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, Observer, of, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {


  subscription: Subscription = new Subscription();
  constructor() { }

  ngOnInit() {
  }


  observableCreate(){
    const hello = Observable.create((observer:Observer<string>)=>{
      observer.next('Hello from observable');
      observer.complete();
    });

    hello.subscribe((val)=>{console.log(val)});
  }

  //atrelar um determinado evento a um componente do template
  fromEventClick(){
    //passar um componente usando viewChild ou document
    //target = a partir de quem quero pegar o evento
    //document = documento todo, todos os elementos do dom
    const subscription =  fromEvent(document,'click').subscribe((event)=>{console.log(event)});
    this.subscription = subscription;

  }

  fromclick(){//vai fazer vários next
    from([1,2,3,4,5,{x:10, y:20}]).subscribe((v)=>{console.log(v)});

    //const source = from([1,2,3,4,5,{x:10, y:20}]);
    //source.subscribe((v)=> console.error(v));
    //source.subscribe((v)=> console.warn(v));
  }

  ofClick(){//of imprime tudo de uma vez, faz um único next
    of([1,2,3,4,5,{x:10, y:20}]).subscribe((v)=>{console.log(v)});
  }

  intervarClick(){

    const source = interval(1000);
    const subscription = source.subscribe((v)=>{console.log(v)});
    this.subscription.add(subscription);

  }

  timerClick(){

    const source = timer(3000,1000);//depois de 3 seg, conte de 1 em 1 seg // se eu colocar somente 1 param, vai contar somente uma vez
    const subscription = source.subscribe((v)=>{console.log(v)});

    this.subscription.add(subscription);
  }

  unsubscribleClick(){
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
  }

}
