import { Component, OnInit } from "@angular/core";
import { UserService } from "./users.service";
import { FormBuilder } from "@angular/forms";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../../shared/classes/class'
import User from '../../shared/models/user'
import { ProfileService } from '../profiles/profiles.service';
import Profile from 'src/app/shared/models/profile';
import { getFreshUser } from '../../shared/functions/utils'

@Component({
  selector: "app-companies",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent extends GridableComponent<User>
  implements OnInit {

  public profiles : Profile[] = []

  getFreshElement = getFreshUser
  constructor(
    private userService: UserService,
    private profileService : ProfileService,
    alertService: AlertsService,
  ) {
    super(userService, alertService);

  }




  

  addUser(user){
    this.newElement=user;
    this.add();
  }


  ngOnInit() {
    this.elementName = "User";
    this.elementNamePlural = "Users";
    this.newElement = this.getFreshElement()
    this.getSome([],{ id : true ,name : true,profiles : true});
    this.profileService.getSome([],{id : true, name : true})
        .subscribe(
            (elements) => {
              this.profiles = elements;
            }
          );  
  }
}
