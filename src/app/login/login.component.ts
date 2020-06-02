import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import { AlertsService } from '../alerts.service';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private alertService : AlertsService, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit({value}: { value: Credentials }) {
    this.authService.login(value)
      .subscribe((res) => {
          this.setSession(res);
          this.router.navigate(['/dashboard']);
      },
      (err) => {
        const message = err.error.message ? err.error.message : err.message   
        this.alertService.error( message )
      })
      
  }

  setSession(token) {
    sessionStorage.setItem('token', token.token);
  }
}
