import {HttpHeaders} from "@angular/common/http";
import {throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class ApiBase {

  constructor(public snackBar: MatSnackBar) {}

  baseUrl = 'http://localhost:3000/';

  handleError(err) {
    this.snackBar.open('something went wrong', null, {
      duration: 2000,
    });

    return throwError(err);
  }
}

export const headersOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
