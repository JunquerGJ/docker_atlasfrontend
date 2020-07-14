import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import User from 'src/app/shared/models/user';
import { ProfileService } from '../../profiles/profiles.service';
import { AlertsService } from 'src/app/alerts.service';
import Profile from 'src/app/shared/models/profile';
import { validModifyedUser } from 'src/app/shared/functions/utils';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() input : User
  user : User;
  public profiles : Profile[] = []
  @Output() updated = new EventEmitter<User>();

  public auxProfile : String = ""
  constructor(private profileService : ProfileService, private alertService : AlertsService ) { 

  }

  ngOnInit(): void {
    this.user = this.input
    this.auxProfile = this.user.profile.name
    this.profileService.getSome([],{id : true, name : true})
    .subscribe(
        (elements) => {
          this.profiles = elements;
        }
      );    
  }

  updateUser(user,name){
    this.profiles.forEach((profile)=>{
      if(profile.name == name){
        user.profile=profile
      }
    })
  }

  update(){
    var result = validModifyedUser(this.user)
    if(!result){
      this.updated.emit(this.user)
    }else{
      this.alertService.error(result)
    }
  }

  setProfile(profileName) {
    var i = 0;
    for(i<0;i<this.profiles.length;i++){
      if(this.profiles[i].name == profileName){
        this.user.profile = this.profiles[i]
        return
      }
    }
    this.auxProfile = ''
  }

}
