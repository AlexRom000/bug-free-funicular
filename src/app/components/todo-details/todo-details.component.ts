import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ITodo} from "../../../models/todo.model";
import {untilDestroyed} from "ngx-take-until-destroy";
import {map} from "rxjs/operators";
import {TodoService} from "../../services/todo.service";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {

  form: FormGroup;
  todo: ITodo = null;
  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(data => data.id),
      untilDestroyed(this)
    ).subscribe((id: string) => this.getTodoById(+id));
  }

  getTodoById(id: number) {
    this.todoService.getTodoById(id).subscribe(todo => {
      this.todo = todo;
      this.initForm(todo);
    });
  }

  ngOnDestroy(): void {}

  handleOpenDeleteConfirm(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: new ConfirmDialogModel("Confirm Action", 'Are you sure you want to delete this todo?')
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.todoService.deleteTodoById(id).subscribe(_ => {
          window.close();
        });
      }
    });
  }

  edit(form: FormGroup) {
    if (form.valid) {
      this.todoService.editTodo({...this.todo, ...form.value, createdAt: new Date()}).subscribe();
    }
  }

  private initForm(todo: ITodo) {
    this.form = this.fb.group({
      name: [todo.name, [Validators.required]],
      description: [todo.description, [Validators.required]],
    });
  }
}
