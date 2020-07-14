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
  }

  update(){
    var result = validCertificate(this.certificate)
    if(!result){
      var pre = this.certificate.expirationDate
      this.certificate.expirationDate = moment(this.certificate.expirationDate, "DD/MM/YYYY").toDate()
      this.updated.emit(this.certificate)
      this.certificate.expirationDate = pre
    }else{
      this.alertService.error(result)
    }
  }

}
