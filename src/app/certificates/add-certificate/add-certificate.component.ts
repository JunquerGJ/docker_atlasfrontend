import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CertificateService } from '../certificates.service';
import { getFreshCertificate } from '../../shared/functions/utils'
import Certificate from 'src/app/shared/models/certificate';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss']
})
export class AddCertificateComponent implements OnInit,OnDestroy {

  public newElement : Certificate

  @Output() created = new EventEmitter<Certificate>()


  constructor() { }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.newElement = getFreshCertificate()
  }

  create(){
    delete this.newElement.id
    this.created.emit(this.newElement)
  }

}
