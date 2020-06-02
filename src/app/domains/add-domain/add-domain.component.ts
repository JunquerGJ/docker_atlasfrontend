import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import Domain from 'src/app/shared/models/domain';
import { getFreshDomain } from 'src/app/shared/functions/utils';
import { AppConstants } from 'src/app/shared/constants/constants';
import { CertificateService } from 'src/app/certificates/certificates.service';
import Certificate from 'src/app/shared/models/certificate';
import Asset from 'src/app/shared/models/asset';
import { AssetService } from 'src/app/assets/assets.service';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.scss']
})
export class AddDomainComponent implements OnInit, OnDestroy {

  public newElement : Domain
  public ssl : boolean = false
  public newCert : String = null
  public readonly _enviroments;
  public certificates : Certificate[]
  public assets : Asset[]


  @Output() created = new EventEmitter<Domain>()

  constructor(private certificateService : CertificateService, private assetService : AssetService) { 
    this._enviroments = AppConstants.enviroments
  }

  ngOnDestroy(){
  }

  ngOnInit(): void {
    this.newElement = getFreshDomain()
    this.certificateService.getSome([],{ domainName : true})
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
  }

  addCertificate(certificate){
    this.newElement.certificate=certificate
  }

  create(){
    this.created.emit(this.newElement)
    this.newElement = getFreshDomain()
  }

  setCertificate(certName){
    this.certificates.forEach((certificate)=>{
      if(certificate.domainName == certName){
        this.newElement.certificate = certificate
      }
    })
  }
  setAsset(name) {
    this.assets.forEach((asset) => {
      if (asset.name == name) {
        this.newElement.asset=asset
      }
    })
  }
}
