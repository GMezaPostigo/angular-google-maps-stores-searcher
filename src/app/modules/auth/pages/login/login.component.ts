import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/core/http/auth/auth.service';
import { Router } from '@angular/router';
import { login } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/reducers';
import { Observable, tap } from 'rxjs';
import { isLoggedIn } from 'src/app/store/selectors/auth.selectors';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(isLoggedIn),
        tap((loggedIn) => {
          if (loggedIn) {
            this.router.navigateByUrl('/maps');
          }
        })
      )
      .subscribe();
  }

  loginForn = new FormGroup({
    password: new FormControl('secret', [Validators.required]),
    email: new FormControl('admin@example.com', [
      Validators.required,
      Validators.email
    ])
  });

  errorMsg: string = '';
  isLoading: boolean = false;

  login(): void {
    if (this.loginForn.invalid) {
      return;
    }
    const loginData = this.loginForn.getRawValue();
    this.isLoading = true;
    this.authService
      .login({ password: loginData.password!, email: loginData.email! })
      .subscribe({
        next: (user) => {
          this.store.dispatch(login({ user }));
          this.router.navigateByUrl('/maps');
        },
        error: (e) => {
          console.error(e);
          this.errorMsg = 'User or password incorrect';
          this.isLoading = false;
        }
      });
  }
}
