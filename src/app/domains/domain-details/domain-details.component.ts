import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Domain from 'src/app/shared/models/domain';
import { ListService } from 'src/app/lists/list.service';
import { AlertsService } from 'src/app/alerts.service';
import List from 'src/app/shared/models/list';
import { AppConstants } from 'src/app/shared/constants/constants';
import { CertificateService } from 'src/app/certificates/certificates.service';
import Certificate from 'src/app/shared/models/certificate';

@Component({
  selector: 'app-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss']
})
export class DomainDetailsComponent implements OnInit {

  public readonly _enviroments;
  public readonly _clients;
  public infoActive : boolean
  public listActive : boolean
  public certificateActive : boolean
  public auxCertificate: String = "";
  public auxList: String = ""

  hadCertificate : boolean;
  
  
  constructor(private listService : ListService, private certificateService : CertificateService,  private alertService : AlertsService) {
    this._enviroments = AppConstants.enviroments
    this._clients = AppConstants.clients
   }
  @Input() input : Domain
  @Output() updated = new EventEmitter<Domain>()
  domain : Domain

  public lists : List[]
  public certificates : Certificate[]

  ngOnInit(): void {
    this.domain = this.input;
    if(this.domain.certificate){
      this.hadCertificate = true
    }

    this.listService.getSome([], {})
      .subscribe(
        (elements) => {
          this.lists = elements;
        }
      );
      this.certificateService.getSome([], {domainName : true})
      .subscribe(
        (elements) => {
          this.certificates = elements;
        }
      );
  }

  setList(name) {
    this.lists.forEach((list) => {
      if (list.name == name) {
        this.domain.lists.push(list)
      }
    })
    this.auxList = ""
  }

  setCertificate(domainName) {

    var i = 0;
    for (i = 0; i < this.certificates.length; i++) {
      if (domainName == this.certificates[i].domainName) {
        this.domain.certificate = this.certificates[i]
        this.auxCertificate = this.certificates[i].domainName
        return
      }
    }
    this.domain.certificate = null
    this.auxCertificate = null
  }


  removeCertificate(){
    this.domain.certificate = null
  }
  toggleList(name) {
    var aux = this.domain.lists.filter(elem => elem.name != name)
    this.domain.lists = aux
  }

  update() {
    delete this.domain.asset


    if(!this.domain.certificate){
      if(!this.hadCertificate){
        delete this.domain.certificate
      }else{
        this.domain.certificate=null
        this.hadCertificate=false
      }
    }else{
      if(!this.hadCertificate){
        this.hadCertificate=true
      }
    }

    this.updated.emit(this.domain)
  }

}
