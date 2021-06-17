import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  top: number = 40;
  left: number = 40;

  @ViewChild('myrect') myRect : ElementRef;

  constructor() { }

  ngOnInit() {
    //captura o momento do click
    let mousedown = fromEvent(this.myRect.nativeElement,'mousedown');
    let mousemove = fromEvent(document,'mousemove');
    let mouseup = fromEvent(document,'mouseup');

    mousedown.subscribe((e: MouseEvent)=>{
      console.log(e);
    });

  }

}
