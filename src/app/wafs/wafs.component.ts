import { Component, OnInit } from "@angular/core";
import { WafService } from "./waf.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import WAF from '../shared/models/waf'
import Domain from '../shared/models/domain';
import { getFreshWAF, getFreshDomain,  } from '../shared/functions/utils'
import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface, ClrDatagridNumericFilterInterface } from '@clr/angular';
import { DomainService } from '../domains/domains.service';
import { Router } from '@angular/router';

interface elementType {
  id: number
  name: string
}



class DomainComparator implements ClrDatagridComparatorInterface<WAF>{
  compare(a, b){
    if(a.domains.length==b.domains.length){
          return 0
      }else{
          if(a.domains.length<b.domains.length){
            return -1
          }else return 1
      }
    }
}

class DomainFilter implements ClrDatagridNumericFilterInterface<WAF>{
  accepts(item, low: number, high: number): boolean {
    if(low || low == 0){
      if(high || high == 0){
        return (item.domains.length<=high && item.domains.length>=low) 
      }else{
        return item.domains.length>=low
      }
    }else{
      if(high || high == 0)
        return item.domains.length<=high
    }
    return true
  }
  
}
@Component({
  selector: 'app-wafs',
  templateUrl: './wafs.component.html',
  styleUrls: ['./wafs.component.scss']
})
export class WAFComponent extends GridableComponent<WAF>
  implements OnInit {
  getFreshElement = getFreshWAF




  public domainComparator = new DomainComparator()
  public domainFilter = new DomainFilter()

  public domains : Domain[] = []

  
  public auxDomain: Domain;


  public addDomain() {
    delete this.auxDomain.id
    this.newElement.domains.push(this.auxDomain);
    this.auxDomain = getFreshDomain()
  }

  setDomain(name) {
    this.domains.forEach((domain) => {
      if (domain.url == name) {
        this.newElement.domains.push(domain)
      }
    })
  }


  constructor(
    private domainService: DomainService,
    wafService : WafService,
    alertService: AlertsService,
    router: Router
  ) {
    super(wafService, alertService,router);
  }

  ngOnInit() {
    this.defaultFields = {id : true,name : true, description: true,denyList : true,domains : true}
    this.elementName = "WAF";
    this.elementNamePlural = "WAFs";
    this.newElement = this.getFreshElement()
    this.getSome([],this.defaultFields);
    this.domainService.getSome([],{ url : true})
      .subscribe(
        (elements) => {
          this.domains = elements;
        }
      );
  }

  addWaf(waf){
    this.newElement = waf
    this.add()
  }
}
