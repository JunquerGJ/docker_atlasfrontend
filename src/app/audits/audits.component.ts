import { Component, OnInit } from "@angular/core";
import { AuditService } from "./audits.service";
import { FormBuilder } from "@angular/forms";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import { getFreshAudit } from '../shared/functions/utils'
import Audit from '../shared/models/audit'
import Asset from '../shared/models/asset';
import User from '../shared/models/user';
import Vulnerability from '../shared/models/vulnerability';
import { AppConstants } from '../shared/constants/constants';
import { AssetService } from '../assets/assets.service';
import { UserService } from '../administration/users/users.service';
import { applyMixins } from '@clr/core/common';
import { Router } from '@angular/router';
@Component({
  selector: "app-companies",
  templateUrl: "./audits.component.html",
  styleUrls: ["./audits.component.scss"]
})
export class AuditsComponent extends GridableComponent<Audit>
  implements OnInit {

  getFreshElement = getFreshAudit
  constructor(
    auditService: AuditService,
    alertService: AlertsService,
    private assetService : AssetService,
    private userService : UserService,
    router: Router
  ) {
    super(auditService, alertService, router);
    this._methodologies = AppConstants.methodologies
    this._auditTools = AppConstants.getAuditTools()
  }

  public auxAsset : Asset
  public auxAuditor : User

  public readonly _methodologies;
  public readonly _auditTools;

  public getThing(vulnerabilities: Vulnerability[], risk: String) {
    let count = 0;
    let i = 0;
    for (i = 0; i < vulnerabilities.length; i++) {
      if (vulnerabilities[i].risk == risk) {
        count++;
      }
    }
    return count;
  }

  transformDate() {
    if (this.newElement.auditDate) { 
      this.newElement.auditDate = new Date(this.newElement.auditDate) 
    }
  }

  public users : User[] = []
  public assets : Asset[] = []

  ngOnInit() {
    this.defaultFields = { id : true, name : true , asset : true, auditDate : true, methodology : true, tool : true,auditor : true, domain: true ,Vulnerability : true}
    this.elementName = "Audit";
    this.elementNamePlural = "Audits";
    this.newElement = this.getFreshElement()
    this.getSome([],this.defaultFields);  

    this.userService.getSome([], {  name : true})
      .subscribe(
        (elements) => {
          var i =0;
          for(i=0;i<elements.length;i++){
            var aux = JSON.parse(JSON.stringify(elements[i]))
            delete aux.profile
            delete aux.id
            this.users.push(aux)
          }
        }
      )
      this.assetService.getSome([], {  name : true})
      .subscribe(
        (elements) => {
          this.assets = elements;
        }
      )
  }

  setAuditor(auditorName) {
    this.users.forEach((auditor) => {
      if (auditor.name == auditorName) {
        this.newElement.auditor = auditor
      }
    })
  }

  setAsset(assetName) {
    this.assets.forEach((asset) => {
      if (asset.name == assetName) {
        this.newElement.asset = asset
      }
    })
  }

  
  addAudit(audit){
    this.transformDate()
    this.newElement = audit;
    this.add()
  }
}
