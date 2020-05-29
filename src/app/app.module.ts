import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsDashboardComponent } from './Products/products-dashboard/products-dashboard.component';
import { ProductComponent } from './Products/product/product.component';
import { ProductService } from './Products/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material';
import { CreatedialogComponent } from './Products/createdialog/createdialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    ProductsDashboardComponent,
    ProductComponent,
    CreatedialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    InputTextModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [ProductService, ReactiveFormsModule, MatDialogModule, { provide: MAT_DIALOG_DATA, useValue: [] }],
  bootstrap: [AppComponent],
  entryComponents: [CreatedialogComponent]
})
export class AppModule { }
