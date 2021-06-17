import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, map, retry, retryWhen, tap, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startTeste(){

    let obj: Observable<any> = new Observable((observer)=>{

      for(let i=0; i<10;i++){
        if(i==7){
          observer.error('Erro ocorreu em i='+i);
        }
        else{
          observer.next(i);
        }
      }

    });

    obj
    .pipe(
      map(i=>i*10),
      tap(i=>console.log('Before error handling: '+ i)),
      catchError((erro)=>{
        console.error('Inside catch ',erro);
        //return of(0);
        return throwError('ThrowError: '+erro);
      }),
      //retry(2),
      retryWhen(i=> timer(5000))
    )
    /*
    .subscribe(
      (i)=> console.log('Normal output: '+i),
      (erro)=> console.log('Erro exibido: '+erro),
      ()=>console.log('Complete')
    );
*/
    let obj2: Observable<any> = new Observable((observer)=>{
      timer(2000).subscribe((n)=> observer.next(1000));
      timer(2500).subscribe((n)=> observer.complete());

    });


    obj2
    .pipe(
      timeout(2500)
    )
    .subscribe(
      (i)=> console.log('N: '+i),
      (erro)=> console.log('Erro: '+erro),
      ()=>console.log('Complete')
    )

  }

}
