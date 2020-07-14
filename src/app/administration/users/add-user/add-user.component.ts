import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import Profile from 'src/app/shared/models/profile';
import { getFreshUser, validUser } from '../../../shared/functions/utils'
import { ProfileService } from '../../profiles/profiles.service';
import { AlertsService } from 'src/app/alerts.service';
import User from 'src/app/shared/models/user';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends AddElementComponent<User> implements OnInit,OnDestroy {


  public auxProfile : String = ""
  public profiles : Profile[] = []
  getFreshElement = getFreshUser
  validateElement = validUser
  ngOnDestroy(): void {}
  

  ngOnInit(): void {
    this.newElement = this.getFreshElement()
    this.profileService.getSome([],{id : true, name : true})
        .subscribe(
            (elements) => {
              this.profiles = elements;
            }
          );
  }
  constructor( private profileService : ProfileService,alertService : AlertsService) {
    super(alertService)
  }

  setProfile(name){
    var aux= false;
    this.profiles.forEach((profile)=>{
      if(profile.name == name){
        this.newElement.profile=profile
        aux=true;
      }
    })

    if(!aux){
      this.auxProfile = ''
      this.newElement.profile = null
    }
  }

}
