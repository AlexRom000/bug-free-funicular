import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ITodo} from "../../models/todo.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";
import {ApiBase, headersOption } from "./api";

@Injectable()
export class TodoService extends ApiBase{

  url = `${this.baseUrl}todos`;

  editedTodo = new BehaviorSubject<ITodo>(null);

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    super(snackBar);
  }

  getAllTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.url, headersOption).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  getTodoById(id: number): Observable<ITodo> {
    return this.http.get<ITodo>(`${this.url}/${id}`, headersOption).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  deleteTodoById(id: number): Observable<ITodo> {
    return this.http.delete<ITodo>(`${this.url}/${id}`, headersOption).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  createTodo(todo: ITodo): Observable<ITodo> {
    todo = {...todo, id: Date.now(), createdAt: new Date(), editedAt: new Date()};
    return this.http.post<ITodo>(this.url, todo, headersOption).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  editTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.url}/${todo.id}`, todo, headersOption).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
}
