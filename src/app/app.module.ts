import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductFormComponent } from './product-form/product-form.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { BasicComponent } from './observables/basicos/basic/basic.component';
import { ColdObservablesComponent } from './observables/cold-observables/cold-observables.component';
import { HotObservablesComponent } from './observables/hot-observables/hot-observables/hot-observables.component';
import { HotObservablesSubjectsComponent } from './observables/hot-observables-subjects/hot-observables-subjects.component';
import { SubjectsComponent } from './subjects/subjects/subjects.component';
import { SubjectChildComponent } from './subjects/subject-child/subject-child.component';
import { BasicCreationComponent } from './rxjs/basic-creation/basic-creation.component';
import { OperatorsComponent } from './rxjs/operators/operators.component';
import { AsyncComponent } from './rxjs/async/async.component';
import { ErrorHandlerComponent } from './rxjs/error-handler/error-handler.component';
import { DragAndDropComponent } from './rxjs/drag-and-drop/drag-and-drop.component';
import { UnsubscribleComponent } from './rxjs/unsubscrible/unsubscrible.component';
import { SwitchMergeComponent } from './rxjs/switch-merge/switch-merge.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    DepartmentFormComponent,
    ProductsTableComponent,
    BasicComponent,
    ColdObservablesComponent,
    HotObservablesComponent,
    HotObservablesSubjectsComponent,
    SubjectsComponent,
    SubjectChildComponent,
    BasicCreationComponent,
    OperatorsComponent,
    AsyncComponent,
    ErrorHandlerComponent,
    DragAndDropComponent,
    UnsubscribleComponent,
    SwitchMergeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
