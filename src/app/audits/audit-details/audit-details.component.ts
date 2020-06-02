import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AssetService } from 'src/app/assets/assets.service';
import { UserService } from 'src/app/administration/users/users.service';
import Audit from 'src/app/shared/models/audit';
import Asset from 'src/app/shared/models/asset';
import User from 'src/app/shared/models/user';
import { HttpParams } from '@angular/common/http';
import { AuditService } from '../audits.service';
import { AlertsService } from 'src/app/alerts.service';
import { AppConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  styleUrls: ['./audit-details.component.scss']
})
export class AuditDetailsComponent implements OnInit, OnDestroy {


  @Input() input: Audit
  @Output() updated = new EventEmitter<Audit>()
  audit: Audit

  public assets: Asset[] = []
  public users: User[] = []
  public auxAuditor: String = ""
  public readonly _methodologies;
  public readonly _auditTools;
  public auxAsset: String = ""

  constructor(private assetService: AssetService, private userService: UserService, private auditService: AuditService, private alertService: AlertsService) {
    this._methodologies = AppConstants.methodologies
    this._auditTools = AppConstants.getAuditTools()
   }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.audit = this.input
    this.getAuditDetails(this.input)

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
    for(i=0;i<this.assets.length;i++){
      if(this.assets[i].name == assetName)
      this.audit.asset = this.assets[i]
      return;
    }
    this.audit.asset = null

  }

  setAuditor(auditorName) {
    
    var i = 0;
    for(i=0;i<this.users.length;i++){
      if( auditorName == this.users[i].name){
        this.audit.auditor = this.users[i]
      }
    }
    this.audit.auditor = null
  }

  getAuditDetails = (audit: Audit) => {
    const aux = {
      id: true,
      asset: {
        select: {
          name: true
        }
      },
      auditor: {
        select: {
          name: true
        }
      },
      name: true,
      auditDate: true,
      methodology: true,
      tool: true,
      scope : true
    }

    const params = new HttpParams()
      .set('params', JSON.stringify(aux))

    this.auditService.get(audit.id, params)
      .subscribe((audit) => {
        this.audit = audit;
        if (this.audit.auditor)
          this.auxAuditor = this.audit.auditor.name
        if (this.audit.asset)
          this.auxAsset = this.audit.asset.name
      },
        error => {
          this.alertService.error(error.error.message)
        });
  };


  
  transformDate() {
    if (this.audit.auditDate) { 
      this.audit.auditDate = new Date(this.audit.auditDate) 
    }
  }

  update() {
    this.transformDate()
    this.updated.emit(this.audit)
  }

}
