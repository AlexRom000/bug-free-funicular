import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  submit(registerForm: FormGroup) {
    if (registerForm.valid) {
      this.authService.register(registerForm.value).subscribe((data: any) => {
        console.log(data);
        if (data && data.access_token) {
          localStorage.setItem('token', data.access_token);

          this.router.navigate(['/todos']);
        }
      });
    }
  }
}
