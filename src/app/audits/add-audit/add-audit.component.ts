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

@Component({
  selector: 'app-add-audit',
  templateUrl: './add-audit.component.html',
  styleUrls: ['./add-audit.component.scss']
})
export class AddAuditComponent extends AddElementComponent<Audit> implements OnInit, OnDestroy {

  getFreshElement = getFreshAudit
  validateElement = validAudit

  public assets: Asset[] = []
  public users: User[] = []
  public auxAuditor: String
  public auxAsset: String

  public readonly _methodologies;
  public readonly _auditTools;

  @Output() created = new EventEmitter<Audit>()

  constructor(private assetService : AssetService, private userService : UserService, alertService : AlertsService) { 
    super(alertService)
    this._methodologies = AppConstants.methodologies
    this._auditTools = AppConstants.getAuditTools()
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = this.getFreshElement()

    this.assetService.getSome([], { name: true })
      .subscribe(
        (elements) => {
          var i = 0;
          for (i = 0; i < elements.length; i++) {
            var aux = JSON.parse(JSON.stringify(elements[i]))
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
  }



  
  setAsset(assetName) {
    var i = 0;
    for(i<0;i<this.assets.length;i++){
      if(this.assets[i].name == assetName){
        this.newElement.asset = this.assets[i]
        return
      }
    }
    this.auxAsset = ''
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
