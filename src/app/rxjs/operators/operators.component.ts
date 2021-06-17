import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material';
import { from, fromEvent, interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, delay, filter, first, last, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple) ripple : MatRipple
  //realizar operações em cadeia sobre um determinado stream de dados

  private  searchInput:string = "";

  constructor() { }

  ngOnInit() {
  }


  mapClick(){

    //manipular os dados que estão sendo gerados
    from([1,2,3,4,5,6,7])
      //o pipe interceptará os dados que estão sendo produzidos e nos permite fazer operações
      //alterar os dados, filtrar, etc
      .pipe(
        //mapeia cada um dos dados gerados
        map(i=> i*2),//ações encadeadas
        map(i=> i*10),
        delay(1000)
      )
      .subscribe(i=>console.log(i));


      fromEvent(document, 'click')
        .pipe(
          map((e: MouseEvent)=>({x: e.screenX, y: e.screenY}))
        )
        .subscribe((pos)=> console.log(pos));
  }


  filterClick(){
    from([1,2,3,4,5,6,7])
    .pipe(
       filter(i => i%2==1)
      
    )
    .subscribe(i=>console.log(i));

    interval(1000)
      .pipe(
        filter(i=> i%2 ==0),
        map(i=> "Value "+i),
        delay(1000)
      )
      .subscribe((i)=> console.log(i));
  }

  //intercepta o fluxo antes do final
  tapClick(){

    interval(1000)
    .pipe(
      tap(i=> console.log('')),//ele não aplica e retorna algo, a ideia é interceptar e fazer algo como logar ou chamar uma função, não trocar valores
      tap(i=> console.warn('Before filter: ', i)),
      filter(i=> i%2 ==0),
      tap(i=> console.warn('After filter: ', i)),
      map(i=> "Value "+i),
      delay(1000)
    )
    .subscribe((i)=> console.log(i));


  }

  takeClick(){

    const observable = new Observable((observer)=>{
      let i;

      for(i=0;i<20;i++){
        
        setTimeout(()=>{
            observer.next(Math.floor(Math.random()*100))
        },i*100);

      }

        setTimeout(()=>{
          observer.complete();
        },i*100);
        
    });


    const s: Subscription = observable
      .pipe(
        tap(i=>console.log('Tap: ',i)),
        //take(10),//take para com o subscription após retornar os elementos que pedi
        //faz unsubscribe automaticamente
        //first(),//pega o primeiro elemento do stream
        //last()
      )
      .subscribe(v=>console.log('Output: ',v),
        (erro)=> console.log(erro),
        ()=> console.log('completed'));

    const interv = setInterval(()=>{
      console.log('Checking..');

      if(s.closed){
        console.warn('Subscription closed');
        clearInterval(interv);
      }

    },200);


  }


  debounceClick(){
    //diminuir a quantidade de eventos que são gerados dentro de um tempo

    fromEvent(document,'click')
    .pipe(
        tap((e)=>console.log('click')),
        debounceTime(500)
    )
    
    .subscribe((e:MouseEvent)=>{
      console.log('Click debounce: ',e);
      this.launchRipple();
    });

  }

  launchRipple(){
    const rippleRef = this.ripple.launch({
      persistent:true, centered:true
    });
    rippleRef.fadeOut();
  }


  searchEntry$: Subject<string> = new Subject<string>();

  searchBy_UsingDebounce(event){
    this.searchEntry$.next(this.searchInput);
  }


  debounceSearch(){
    this.searchEntry$
    .pipe(
      debounceTime(500)
    )
    .subscribe((s)=>console.log(s));
  }


  takeWhileClick(){
    interval(500)
    .pipe(
      takeWhile((value, index)=> (value<5))//retorna um boolean dizendo até quando capturar o evento
    )
    .subscribe((n)=> console.log("takeWhile", n),
    (erro)=> console.error(erro),
    ()=> console.warn('completed'))

  }

  takeUntilClick(){

    let dueTime$ = timer(5000);
    interval(1000)
    .pipe(
      takeUntil(dueTime$)
    )
    .subscribe((n)=> console.log("takeUntil", n),
    (erro)=> console.error(erro),
    ()=> console.warn('completed'))

  }

}
