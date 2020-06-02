import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Profile from 'src/app/shared/models/profile';
import { ProfileService } from '../profiles.service';
import { AlertsService } from 'src/app/alerts.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  
  @Input() input : Profile;
  profile : Profile;
  @Output() updated = new EventEmitter<Profile>();
  public administrationEntities = ["Area","User","Profile","Asset","Audit","Vulnerability","CWE","Contact","Network","IP","Server","Characteristic","Domain"]
  public permissionList =["CREATE","READ","UPDATE","DELETE"]

  constructor(private profileService : ProfileService,private alertService : AlertsService) { }

  ngOnInit(): void {
    this.profile = this.input;
    this.profile.permissions = []
    this.getProfileDetails(this.input)
  }
  
  getProfileDetails = (profile: Profile) => {
    const aux = {
      permissions : true
    }

    const params = new HttpParams()
      .set('params',JSON.stringify(aux))

    this.profileService.get(profile.id,params)
      .subscribe((profile) => {
        this.profile = profile;
      },
      error => {
        this.alertService.error(error.error.message)
      });
  };

  toggle2(e,functionalityName){
    if(e.target.checked){
      this.addFunctionality2(functionalityName)
    }else{
      this.removeFunctionality2(functionalityName)
    }
  }

  addFunctionality2(functionalityName){
    this.profile.permissions.push({ name : functionalityName})
  }

  hasPermission(permission){
    var i =0;
    for(i=0;i<this.profile.permissions.length;i++){
      if(this.profile.permissions[i].name==permission)
        return true
    }
    return false;
  }
  
  removeFunctionality2(functionalityName){
    var filtered = this.profile.permissions.filter(function(value,index,arr){
      return value.name != functionalityName
    })
    this.profile.permissions=filtered
  }

  update(){
    this.updated.emit(this.profile)
  }

}
