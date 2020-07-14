import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { getFreshProfile, validProfile } from 'src/app/shared/functions/utils';
import Profile from 'src/app/shared/models/profile';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent extends AddElementComponent<Profile> implements OnInit, OnDestroy {


  getFreshElement = getFreshProfile
  validateElement = validProfile
  constructor(alertService : AlertsService) {
    super(alertService)
   }
  ngOnDestroy(): void {}
  
  public administrationEntities = ["Area","User","Profile","Asset","Audit","Vulnerability","CWE","Contact","Network","IP","Server","Characteristic","Domain","Certificate","List"]
  public permissionList =["CREATE","READ","UPDATE","DELETE"]


  ngOnInit(): void {
    this.newElement = this.getFreshElement()
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

  toggle2(e,functionalityName){
    if(e.target.checked){
      this.addFunctionality2(functionalityName)
    }else{
      this.removeFunctionality2(functionalityName)
    }
  }
}
