import { Component, OnInit } from "@angular/core";
import { CertificateService } from "./certificates.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import Certificate from '../shared/models/certificate'
import { getFreshCertificate } from '../shared/functions/utils'
import { ClrDatagridComparatorInterface } from '@clr/angular';
class DateComparator implements ClrDatagridComparatorInterface<Certificate>{
  compare(a : Certificate, b : Certificate) {
    if(new Date(a.expirationDate)< new Date(b.expirationDate)){
      return -1
    }else{
      if(new Date(a.expirationDate)> new Date(b.expirationDate)){
        return 1
      } else return 0
    }
  }
}




@Component({
  selector: "app-companies",
  templateUrl: "./certificates.component.html",
  styleUrls: ["./certificates.component.scss"]
})




export class CertificatesComponent extends GridableComponent<Certificate>
  implements OnInit {
  getFreshElement = getFreshCertificate
  constructor(
    certificateService: CertificateService,
    alertService: AlertsService
  ) {
    super(certificateService, alertService);
  }

public dateComparator = new DateComparator()


  ngOnInit() {
    this.elementName = "Certificate";
    this.elementNamePlural = "Certificates";
    this.newElement = this.getFreshElement()
    this.columns = ["Name"]
    this.getSome([],{});  
  }


  public addCertificate(certificate){
    this.newElement = certificate
    this.add()
  }
}
