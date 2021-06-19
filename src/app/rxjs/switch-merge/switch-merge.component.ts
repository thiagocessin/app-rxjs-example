import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, filter, map, mergeAll, mergeMap, switchAll, switchMap } from 'rxjs/operators';
import { Person } from './person.model';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {
  
  @ViewChild('searchBy') inputSearchRef: ElementRef;
  searchInput: string = '';
  people$: Observable<Person[]>;
  private readonly url: string ='http://localhost:9000';

  constructor(private http:HttpClient) { }

  ngOnInit() {
   // this.firstOption();
  //this.secondOption();
  this.thirdOption();
  }

  filterPeople(searchInput:string): Observable<Person[]>{
    if(searchInput.length==0) return of([]);
    return this.http.get<Person[]>(`${this.url}/${this.searchInput}`);
  }

  thirdOption(){

    let keyUp$ = fromEvent(this.inputSearchRef.nativeElement,'keyup');
    /*
    this.people$ = keyUp$
      .pipe(map((e)=>this.filterPeople(this.searchInput)))
      .pipe(switchAll());//conecta a todos os subscrible, mas troca as antigas pelas novas, sempre vale a ultima reqwuisição
  */

      this.people$ = keyUp$
        .pipe(
          debounceTime(700),
          switchMap(()=>this.filterPeople(this.searchInput)));

  }
  secondOption(){
    let keyUp$ = fromEvent(this.inputSearchRef.nativeElement,'keyup');
   // let fetch$ = keyUp$.pipe(map((e)=>this.filterPeople(this.searchInput)));

    //fetch$
    //.pipe(mergeAll())//vai chamar o subscribe interno de filterPeople automaticamente
   //.subscribe((data)=>console.log(data));

    //this.people$  = fetch$.pipe(mergeAll());
    
    this.people$ = keyUp$.pipe(mergeMap((e)=>this.filterPeople(this.searchInput)));
  }

  firstOption(){
    fromEvent(this.inputSearchRef.nativeElement,'keyup')
      .subscribe(e=>{ 
        this.filterPeople(this.searchInput);
    });
  }

  




}
