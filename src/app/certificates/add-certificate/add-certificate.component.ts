import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CertificateService } from '../certificates.service';
import { getFreshCertificate, validCertificate } from '../../shared/functions/utils'
import Certificate from 'src/app/shared/models/certificate';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss']
})
export class AddCertificateComponent extends AddElementComponent<Certificate> implements OnInit,OnDestroy {


  getFreshElement = getFreshCertificate
  validateElement = validCertificate

  constructor(alertService : AlertsService) { 
    super(alertService)
  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.newElement = this.getFreshElement()
  }

}
