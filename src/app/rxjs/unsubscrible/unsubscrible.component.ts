import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscrible',
  templateUrl: './unsubscrible.component.html',
  styleUrls: ['./unsubscrible.component.css']
})
export class UnsubscribleComponent implements OnInit {

  private subscriptionsActive = false;
  private subscriptions: Subscription[] = [];
  private unsubscribleAll$ : Subject<any> = new Subject();
  private intervalSubscription : Subscription = null;

  constructor() { }

  ngOnInit() {
    this.checkSubscription();
  }

  checkSubscription(){
    this.intervalSubscription = interval(100).subscribe(()=>{
      let active = false;
      this.subscriptions.forEach((s)=>{
        if(!s.closed) active = true;
      })
      this.subscriptionsActive = active;
    })

  }
  subscrible(){
    const s1 = interval(100)
    .pipe(takeUntil(this.unsubscribleAll$))
    .subscribe((i)=>console.log(i))
    const s2 = fromEvent(document,'mousemove')
    .pipe(takeUntil(this.unsubscribleAll$))
    .subscribe((e)=> console.log(e))

    this.subscriptions.push(s1)
    this.subscriptions.push(s2)

  }

  unsubscrible(){
    this.unsubscribleAll$.next();
  }

  ngOnDestroy(){
    if(this.intervalSubscription != null){
      this.intervalSubscription.unsubscribe();
    }

    this.unsubscribleAll$.next();
    
  }

}
