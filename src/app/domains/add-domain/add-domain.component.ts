import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import Domain from 'src/app/shared/models/domain';
import { getFreshDomain, validDomain } from 'src/app/shared/functions/utils';
import { AppConstants } from 'src/app/shared/constants/constants';
import { CertificateService } from 'src/app/certificates/certificates.service';
import Certificate from 'src/app/shared/models/certificate';
import Asset from 'src/app/shared/models/asset';
import { AssetService } from 'src/app/assets/assets.service';
import WAF from 'src/app/shared/models/waf';
import { WafService } from 'src/app/wafs/waf.service';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.scss']
})
export class AddDomainComponent extends AddElementComponent<Domain> implements OnInit, OnDestroy {

  getFreshElement = getFreshDomain
  validateElement = validDomain
  
  public ssl : boolean = false
  public newCert : String = null
  public readonly _enviroments;
  public readonly _clients;
  public certificates : Certificate[]
  public assets : Asset[]
  public wafs : WAF[]

  public newWaf : String = null 


  public auxWaf: String = ""
  public auxAsset: String = ""
  public auxCertificate: String = ""

  @Input() fromAsset : boolean = false

  constructor(private wafService : WafService,private certificateService : CertificateService, private assetService : AssetService,alertService : AlertsService) { 
    super(alertService)
    this._enviroments = AppConstants.enviroments
    this._clients = AppConstants.clients
  }

  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.newElement = this.getFreshElement()
    this.certificateService.getSome([],{ domainName : true,wildcard : true,issuer : true, expirationDate : true})
      .subscribe(
        (elements) => {
          this.certificates = elements
        }
      )
      this.assetService.getSome([],{ name : true})
      .subscribe(
        (elements) => {
          this.assets = elements
        }
      )
      this.wafService.getSome([],{ name : true , description : true, denyList:true})
      .subscribe(
        (elements) => {
          this.wafs = elements
        }
      )
  }

  addCertificate(certificate){
    this.newElement.certificate=certificate
    this.newCert='CertCreated'
  }

  
  addWaf(waf) {
    this.newElement.wafs.push(waf)
    this.auxWaf = ''
    this.newWaf = null
  }


  toggleWaf(waf) {
    var aux = this.newElement.wafs.filter(elem => elem.name != waf.name)
    this.newElement.wafs = aux
  }

  setCertificate(name) {
    var i = 0;
    for(i<0;i<this.certificates.length;i++){
      if(this.certificates[i].domainName == name){
        this.newElement.certificate = this.certificates[i]
        return
      }
    }
    this.auxCertificate = ''
  }
  
  setAsset(name) {
    var i = 0;
    for(i<0;i<this.assets.length;i++){
      if(this.assets[i].name == name){
        this.newElement.asset = this.assets[i]
        return
      }
    }
    this.auxAsset = ''
  }

  setWaf(name) {
    var i = 0;
    for(i<0;i<this.wafs.length;i++){
      if(this.wafs[i].name == name){
        this.newElement.wafs.push(this.wafs[i])
      }
    }
    this.auxWaf = ''
    this.newWaf = null
  }
}
