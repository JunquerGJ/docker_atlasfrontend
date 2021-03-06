import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import Audit from 'src/app/shared/models/audit';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getFreshAudit, validAudit } from 'src/app/shared/functions/utils';
import Asset from 'src/app/shared/models/asset';
import { AssetService } from 'src/app/assets/assets.service';
import { UserService } from 'src/app/administration/users/users.service';
import User from 'src/app/shared/models/user';
import { AppConstants } from 'src/app/shared/constants/constants';
import { AlertsService } from 'src/app/alerts.service';
import { ElementSchemaRegistry } from '@angular/compiler';
import { AddElementComponent } from 'src/app/shared/classes/class';
import { DomainService } from 'src/app/domains/domains.service';
import Domain from 'src/app/shared/models/domain';

@Component({
  selector: 'app-add-audit',
  templateUrl: './add-audit.component.html',
  styleUrls: ['./add-audit.component.scss']
})
export class AddAuditComponent extends AddElementComponent<Audit> implements OnInit, OnDestroy {

  getFreshElement = getFreshAudit
  validateElement = validAudit

  public assets: Asset[] = []
  public domains: Domain[] = []
  public users: User[] = []
  public auxAuditor: String
  public auxAsset: String
  public auxDomain: String

  public readonly _methodologies;
  public readonly _auditTools;

  @Output() created = new EventEmitter<Audit>()

  constructor(private assetService : AssetService, private domainService : DomainService ,private userService : UserService, alertService : AlertsService) { 
    super(alertService)
    this._methodologies = AppConstants.methodologies
    this._auditTools = AppConstants.getAuditTools()
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = this.getFreshElement()

    this.assetService.getSome([], { name: true, Domain : true })
      .subscribe(
        (elements) => {
          var i = 0;
          for (i = 0; i < elements.length; i++) {
            var aux = JSON.parse(JSON.stringify(elements[i]))
            var j = 0;
            for(j=0;j<aux.Domain.length;j++){
                delete aux.Domain[j].client
                delete aux.Domain[j].id
                delete aux.Domain[j].assetId
                delete aux.Domain[j].wafs
                delete aux.Domain[j].privateDomain
                delete aux.Domain[j].errorCode
                delete aux.Domain[j].enviroment
                delete aux.Domain[j].certificate
                delete aux.Domain[j].certificateId
            }
            this.assets.push(aux)
          }
        }
      )

      this.userService.getSome([], { name: true })
      .subscribe(
        (elements) => {
          var i = 0;
          for (i = 0; i < elements.length; i++) {
            var aux = JSON.parse(JSON.stringify(elements[i]))
            delete aux.profile
            delete aux.id
            this.users.push(aux)
          }
        }
      )

      /*this.domainService.getSome([], { url: true })
      .subscribe(
        (elements) => {
          var i = 0;
          for (i = 0; i < elements.length; i++) {
            var aux = JSON.parse(JSON.stringify(elements[i]))
            this.domains.push(aux)
          }
        }
      )*/
  }



  
  setAsset(assetName) {
    var i = 0;
    for(i<0;i<this.assets.length;i++){
      if(this.assets[i].name == assetName){
        this.newElement.asset = this.assets[i]
        this.domains = this.assets[i].Domain
        return
      }
    }
    this.auxAsset = ''
  }

  setDomain(domainUrl) {
    var i = 0;
    for(i<0;i<this.domains.length;i++){
      if(this.domains[i].url == domainUrl){
        this.newElement.domain = this.domains[i]
        return
      }
    }
    this.auxDomain = ''
  }

  setAuditor(auditorName) {
    var i = 0;
    for(i<0;i<this.users.length;i++){
      if(this.users[i].name == auditorName){
        this.newElement.auditor = this.users[i]
        return
      }
    }
    this.auxAuditor = ''
  }

    

}
