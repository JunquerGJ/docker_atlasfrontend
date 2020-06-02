import {Component, OnInit} from '@angular/core';
import { UserService } from './administration/users/users.service';
import { AlertsService } from './alerts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'atlas-frontend';
  isActive: boolean;
  isPVisible : boolean = false
  active: string;

  constructor(private userService : UserService,private alertService : AlertsService) {
    this.isActive = true;
  }

  ngOnInit() {
    if (this.isActive === true) {
      this.active = 'active';
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem('token');
  }

  logout(){
    sessionStorage.removeItem('token')
  }

  changePassword({value}: { value }){
    console.log("OJOOJO",value)
    this.userService.changePassword(value)
      .subscribe((res) => {
        this.alertService.success("Password changed")
      },
      (err) => {
        const message = err.error.message ? err.error.message : err.message   
        this.alertService.error( message )
      })
  }

}
