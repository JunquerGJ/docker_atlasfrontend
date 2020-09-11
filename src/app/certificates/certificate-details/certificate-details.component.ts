import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertsService } from 'src/app/alerts.service';
import { validCertificate } from 'src/app/shared/functions/utils';
import Certificate from 'src/app/shared/models/certificate';
import * as moment from 'moment'

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit {

  @Input() input : Certificate
  certificate : Certificate
  @Output() updated = new EventEmitter<Certificate>()
  constructor(private alertService : AlertsService) { }

  ngOnInit(): void {
    this.certificate = this.input
    this.certificate.expirationDate = new Date(this.certificate.expirationDate)
  }

  update(){
    var result = validCertificate(this.certificate)
    if(!result){
      if(this.certificate.expirationDate){
        this.certificate.expirationDate = new Date(this.certificate.expirationDate)
      }
      this.updated.emit(this.certificate)
    }else{
      this.alertService.error(result)
    }
  }

}
