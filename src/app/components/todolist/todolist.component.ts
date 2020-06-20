import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ITodo} from "../../../models/todo.model";
import {TodoService} from "../../services/todo.service";
import {FormGroup} from "@angular/forms";

import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogModel, ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodolistComponent implements OnInit {

  todos: ITodo[] = [];

  displayedColumns: string[] = ['number', 'name', 'description', 'createdAt', 'editedAt', 'controls'];

  constructor (private todoService: TodoService,
               private router: Router,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe((todos: ITodo[]) => this.todos = todos);
  }

  openModalConfirmCreateTodo($event: FormGroup) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: new ConfirmDialogModel("Confirm Action", 'Are you sure you want to create todo with this data?')
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
         this.todoService.createTodo($event.value).subscribe(_ => this.getAllTodos());
      }
    });
  }

  handleOpenConfirmDeleteTodo(id: number) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: new ConfirmDialogModel("Confirm Action", 'Are you sure you want to delete this todo?')
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.todoService.deleteTodoById(id).subscribe(_ => this.getAllTodos());
      }
    });
  }

  handleEditTodoMode(id: number) {
    const editTodo = this.todos.find(todo => todo.id === id);
    this.todoService.editedTodo.next({...editTodo});
  }

  editTodo($event: ITodo) {
    this.todoService.editTodo($event).subscribe(_ => this.getAllTodos());
  }

  goToDetails(row: ITodo) {


    const url = this.router.serializeUrl(this.router.createUrlTree(['todos', row.id]));
    window.open(url, '_blank');

  }
}
