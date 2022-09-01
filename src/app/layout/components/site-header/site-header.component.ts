import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env';
import { logout } from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {
  title: string = environment.projectName;
  user: any;
  constructor(private router: Router, private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(logout({ user: null }));
    this.router.navigateByUrl('/auth');
  }
}
