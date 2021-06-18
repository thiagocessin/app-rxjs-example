import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    //retorna o mouseEvent
    mousedown.subscribe((mouseDown: MouseEvent)=>{
      console.log(mouseDown);
      let x = mouseDown.pageX;
      let y = mouseDown.pageY;

      mousemove
      .pipe(takeUntil(mouseup))
      .subscribe((mouseMove:MouseEvent)=>{
        console.log("#mouseMove",mouseMove);

          let offSetx = x - mouseMove.pageX;
          let offSety = y - mouseMove.pageY;

          this.top -= offSety;
          this.left -=offSetx;

          x = mouseMove.pageX;
          y= mouseMove.pageY;
        
      });


    });

  }

}
