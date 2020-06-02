import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./profiles.service";
import { FormBuilder } from "@angular/forms";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../../shared/classes/class'
import Profile from '../../shared/models/profile'
import { ClrDatagridComparatorInterface } from '@clr/angular';
import User from 'src/app/shared/models/user';

class ProfileComparator implements ClrDatagridComparatorInterface<User[]>{
  compare(a ,b){
    return a.User.length-b.User.length
  }
}



@Component({
  selector: "app-companies",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"]
})

export class ProfilesComponent extends GridableComponent<Profile>
  implements OnInit {
  
    getFreshElement(): Profile {
    return { id : 0, name : "", permissions : []}
  }

  public profileComparator  = new ProfileComparator();
  constructor(
    profileService: ProfileService,
    alertService: AlertsService
  ) {
    super(profileService, alertService);
  }

  public administrationEntities = ["Area","User","Profile","Asset","Audit","Vulnerability","CWE","Contact","Network","IP","Server","Characteristic","Domain"]
  public permissionList =["CREATE","READ","UPDATE","DELETE"]


  toggle2(e,functionalityName){
    if(e.target.checked){
      this.addFunctionality2(functionalityName)
    }else{
      this.removeFunctionality2(functionalityName)
    }
  }

  addFunctionality2(functionalityName){
    this.newElement.permissions.push({ name : functionalityName})
  }
  
  removeFunctionality2(functionalityName){
    var filtered = this.newElement.permissions.filter(function(value,index,arr){
      return value.name != functionalityName
    })
    this.newElement.permissions=filtered
  }

  ngOnInit() {
    this.elementName = "Profile";
    this.defaultFields = {id : true,name: true,User : true}
    this.elementNamePlural = "Profiles";
    this.newElement = { id : 0, name : "", permissions : []}
    this.columns = ["Name","Users"]
    this.getSome([],this.defaultFields);  
  }
}
