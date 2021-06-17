import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {

  @ViewChild('myButton') button : ElementRef;



  n1: number = 0;
  n2: number = 0;
  s1:string = "";
  s2: string = "";

  constructor() { }

  ngOnInit() {
    //unica fonte de dados
    let myBtnClickObservable : Observable<number> = fromEvent(this.button.nativeElement,'click');
    myBtnClickObservable.subscribe((event)=>{console.log('button clicked 1')});
    myBtnClickObservable.subscribe((event)=>{console.log('button clicked 2')});
  
    //classe que produzirá os dados
    // lista de listener que estará observando o objeto produtor
    class Producer{
        private myListeners = [];
        private n = 0;
        private id;

        //adicionará 1 item que escutará os dados que estão sendo gerados pelo produtor
        addListener(l){
          console.log('Listener lentgth: '+ this.myListeners.length);
          this.myListeners.push(l);
        }

        //inicia a geração dos dados
        start(){
          
          this.id = setInterval(()=>{
            this.n++;
            console.log('From producer: ' + this.n);

            for(let l of this.myListeners){
              l(this.n);
            }
          },1000)
        }

        stop(){
          clearInterval(this.id);
        }


    }

    let producer:Producer = new Producer();
    producer.start();

    setTimeout(()=>{

      producer.addListener((n)=>{
        console.log('From listener 1', n);
      });
      producer.addListener((n)=>{
        console.log('From listener 2', n);
      });
      
    },4000);

    const myHotObservable = new Observable((observer:Observer<number>)=>{

      producer.addListener((n)=>{
        observer.next(n);
      })

    });

    myHotObservable.subscribe((n)=>{
      console.log('From subscriber 1', n);
    });

    myHotObservable.subscribe((n)=>{
      console.log('From subscriber 2', n);
    });

   

  }

}
