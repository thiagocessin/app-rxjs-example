import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotObservablesSubjectsComponent } from './hot-observables-subjects.component';

describe('HotObservablesSubjectsComponent', () => {
  let component: HotObservablesSubjectsComponent;
  let fixture: ComponentFixture<HotObservablesSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotObservablesSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotObservablesSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
