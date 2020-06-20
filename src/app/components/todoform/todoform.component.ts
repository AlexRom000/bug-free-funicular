import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";
import {ITodo} from "../../../models/todo.model";
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss']
})
export class TodoformComponent implements OnInit, OnDestroy {

  @Output()
  creatTodo = new EventEmitter<FormGroup>();
  @Output()
  editTodo = new EventEmitter<ITodo>();

  todoForm: FormGroup;
  editedTodo = null;


  constructor( private fb: FormBuilder, private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.editedTodo.pipe(
      untilDestroyed(this)
    ).subscribe((editedTodo: ITodo) => {
      this.initForm(editedTodo);
      this.editedTodo = editedTodo;
    });
  }

  ngOnDestroy() {}

  initForm(editedTodo) {
    this.todoForm = this.fb.group({
      name: [editedTodo ? editedTodo.name : null, [Validators.required]],
      description: [editedTodo ? editedTodo.description : null, [Validators.required]],
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      !this.editedTodo ?
        this.creatTodo.emit(form) :
        this.editTodo.emit({...this.editedTodo, ...form.value, editedAt: new Date()});
    }
  }

}
