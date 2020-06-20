import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";
import {ApiBase, headersOption} from "./api";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiBase {

  constructor(private http: HttpClient, public snackBar: MatSnackBar, private router: Router) {
    super(snackBar);
  }

  url = `${this.baseUrl}auth`;

  register(form: {email: string, password: string}) {
    return this.http.post(`${this.url}/register`, form, headersOption).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  login(form: {email: string, password: string}) {
    return this.http.post(`${this.url}/login`, form, headersOption).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
