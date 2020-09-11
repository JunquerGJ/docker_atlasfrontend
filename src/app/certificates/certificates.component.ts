import { Component, OnInit } from "@angular/core";
import { CertificateService } from "./certificates.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import Certificate from '../shared/models/certificate'
import { getFreshCertificate } from '../shared/functions/utils'
import { ClrDatagridComparatorInterface, ClrDatagridNumericFilterInterface } from '@clr/angular';
import { Router } from '@angular/router';

function getDays(expirationDate) {
  var a = new Date(expirationDate).getTime();
  var b = new Date().getTime();

  return Math.round((a - b) / (1000 * 60 * 60 * 24));
}

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


class DaysComparator implements ClrDatagridComparatorInterface<Certificate>{
  compare(a, b) {
    var daysA = getDays(a.expirationDate)
    var daysB = getDays(b.expirationDate)

    if (daysA == daysB) {
      return 0
    } else {
      if (daysA < daysB) {
        return -1
      } else return 1
    }
  }
}

class DaysFilter implements ClrDatagridNumericFilterInterface<Certificate>{
  accepts(item, low: number, high: number): boolean {
    var days = getDays(item.expirationDate)
    if(low || low == 0){
      if(high || high == 0){
        return (days<=high && days>=low) 
      }else{
        return days>=low
      }
    }else{
      if(high || high == 0)
        return days<=high
    }
    return true
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

  public daysComparator : DaysComparator = new DaysComparator()
  public daysFilter = new DaysFilter()

  constructor(
    certificateService: CertificateService,
    alertService: AlertsService,
    router : Router
  ) {
    super(certificateService, alertService, router);
  }

public dateComparator = new DateComparator()


  ngOnInit() {
    this.elementName = "Certificate";
    this.elementNamePlural = "Certificates";
    this.newElement = this.getFreshElement()
    this.columns = ["Name"]
    this.getSome([],{});  
  }


getDays(expirationDate) {
  var a = new Date(expirationDate).getTime();
  var b = new Date().getTime();

  return Math.round((a - b) / (1000 * 60 * 60 * 24));
}

  public addCertificate(certificate){
    this.newElement = certificate
    this.add()
  }
}
