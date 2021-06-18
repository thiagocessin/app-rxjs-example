import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribleComponent } from './unsubscrible.component';

describe('UnsubscribleComponent', () => {
  let component: UnsubscribleComponent;
  let fixture: ComponentFixture<UnsubscribleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubscribleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
