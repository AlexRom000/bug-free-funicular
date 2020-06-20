import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodolistComponent} from "./components/todolist/todolist.component";
import {LoginGuardService} from "./services/login-guard.service";
import {LoginComponent} from "./components/login/login.component";
import {TodoDetailsComponent} from "./components/todo-details/todo-details.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'todos', component: TodolistComponent, canActivate: [LoginGuardService]},
  { path: 'todos/:id', component: TodoDetailsComponent, canActivate: [LoginGuardService]},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
