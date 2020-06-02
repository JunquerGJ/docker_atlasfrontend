import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import Audit from 'src/app/shared/models/audit';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getFreshAudit } from 'src/app/shared/functions/utils';
import Asset from 'src/app/shared/models/asset';
import { AssetService } from 'src/app/assets/assets.service';
import { UserService } from 'src/app/administration/users/users.service';
import User from 'src/app/shared/models/user';
import { AppConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-add-audit',
  templateUrl: './add-audit.component.html',
  styleUrls: ['./add-audit.component.scss']
})
export class AddAuditComponent implements OnInit, OnDestroy {


  public newElement : Audit
  public assets: Asset[] = []
  public users: User[] = []
  public auxAuditor: User
  public auxAsset: Asset

  public readonly _methodologies;
  public readonly _auditTools;

  @Output() created = new EventEmitter<Audit>()

  constructor(private assetService : AssetService, private userService : UserService) { 
    this._methodologies = AppConstants.methodologies
    this._auditTools = AppConstants.getAuditTools()
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = getFreshAudit()

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
    this.assets.forEach((asset) => {
      if (asset.name == assetName) {
        this.newElement.asset = asset
      }
    })
  }

  setAuditor(auditorName) {
    this.users.forEach((auditor) => {
      if (auditor.name == auditorName) {
        this.newElement.auditor = auditor
      }
    })
  }

  transformDate() {
    if (this.newElement.auditDate) { 
      this.newElement.auditDate = new Date(this.newElement.auditDate) 
    }
  }  

  create(){
    delete this.newElement.id
    this.transformDate()
    this.created.emit(this.newElement)
  }

}
