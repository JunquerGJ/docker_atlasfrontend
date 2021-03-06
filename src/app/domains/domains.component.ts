import { Component, OnInit, OnDestroy } from "@angular/core";
import { DomainService } from "./domains.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import Domain from '../shared/models/domain'
import { AppConstants } from '../shared/constants/constants';
import { getFreshDomain, getFreshCertificate } from '../shared/functions/utils'
import { ClrDatagridStringFilterInterface, ClrDatagridComparatorInterface, ClrDatagridNumericFilterInterface } from '@clr/angular';
import { Router } from '@angular/router';


class AssetFilter implements ClrDatagridStringFilterInterface<Domain>{
  accepts(item: any, search: string): boolean {
     console.log(item.asset.name,search)
     return (item.asset.name.toUpperCase().indexOf(search.toUpperCase())>-1)
  }
}
class AssetComparator implements ClrDatagridComparatorInterface<Domain>{
  compare(a: Domain, b: Domain): number {
    if(a.asset.name==b.asset.name){
      return 0
    }else{
      if(a.asset.name<b.asset.name){
        return -1
      }else return 1
    }
  }
}



class SSLComparator implements ClrDatagridComparatorInterface<Domain>{
  compare(a: Domain, b: Domain): number {
    if(a.certificate){
      if(b.certificate){
        if(a.certificate==b.certificate){
          return 0
        }else{
          if(a.certificate<b.certificate){
            return -1
          }else return 1
        }
      }else return -1
    }else if(b.certificate){
      return 1
    }else return 0
  }
  }
class SSLFilter implements ClrDatagridStringFilterInterface<Domain>{
  accepts(item: Domain, search: string): boolean {
    if(search=='y')
      return !!item.certificate;
    else if(search=='n')
      return !item.certificate
    return true
  }
}
  
function getDays(expirationDate) {
  var a = new Date(expirationDate).getTime();
  var b = new Date().getTime();

  return Math.round((a - b) / (1000 * 60 * 60 * 24));
}

class DaysComparator implements ClrDatagridComparatorInterface<Domain>{
  compare(a, b) {
    var daysA = getDays(a.certificate.expirationDate)
    var daysB = getDays(b.certificate.expirationDate)

    if (daysA == daysB) {
      return 0
    } else {
      if (daysA < daysB) {
        return -1
      } else return 1
    }
  }
}

class DaysFilter implements ClrDatagridNumericFilterInterface<Domain>{
  accepts(item, low: number, high: number): boolean {
    var days = getDays(item.certificate.expirationDate)
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
  templateUrl: "./domains.component.html",
  styleUrls: ["./domains.component.scss"]
})


export class DomainsComponent extends GridableComponent<Domain>
implements OnInit {
  getFreshElement = getFreshDomain
  
  public auxCertificate = getFreshCertificate()
  
  public assetFilter = new AssetFilter()
  public assetComparator = new AssetComparator()

  public sslFilter = new SSLFilter()
  public sslComparator = new SSLComparator() 

  public readonly _enviroments;

  public daysComparator : DaysComparator = new DaysComparator()
  public daysFilter = new DaysFilter()

  constructor(
    domainService: DomainService,
    alertService: AlertsService,
    router: Router
  ) {
    super(domainService, alertService,router);
    this._enviroments = AppConstants.enviroments
  }

  ngOnInit() {
    this.elementName = "Domain";
    this.defaultFields = { id : true, enviroment : true, url : true ,asset : { select : { name : true,servers : { select : { hostname: true,ip : true}}} }, wafs: true, certificate : true, privateDomain : true, client : true ,errorCode : true, comments : true}
    this.elementNamePlural = "Domains";
    this.newElement = this.getFreshElement()
    this.getSome([],this.defaultFields);  
  }

  addDomain(domain){
    this.newElement = domain;
    this.add()
  }

  getDays(expirationDate) {
    var a = new Date(expirationDate).getTime();
    var b = new Date().getTime();
  
    return Math.round((a - b) / (1000 * 60 * 60 * 24));
  }

  public modifyDomain(domain){
    
    let aux = JSON.parse(JSON.stringify(domain))
    delete aux.certificate
    delete aux.asset
    this.modify(aux)

  }





}
