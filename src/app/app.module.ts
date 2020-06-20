import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoformComponent } from './components/todoform/todoform.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import {TodoService} from './services/todo.service';
import {LoginGuardService} from "./services/login-guard.service";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientInterceptor} from "./interceptors/http.interceptor";

import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TodoformComponent,
    ConfirmDialogComponent,
    LoginComponent,
    TodoDetailsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    TodoService,
    LoginGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
