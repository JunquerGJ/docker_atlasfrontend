import { Component, OnInit } from "@angular/core";
import { ListService } from "./list.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import List from '../shared/models/list'
import Domain from '../shared/models/domain';
import { getFreshList, getFreshDomain,  } from '../shared/functions/utils'
import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface, ClrDatagridNumericFilterInterface } from '@clr/angular';
import { DomainService } from '../domains/domains.service';
import { Router } from '@angular/router';

interface elementType {
  id: number
  name: string
}



class DomainComparator implements ClrDatagridComparatorInterface<List>{
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

class DomainFilter implements ClrDatagridNumericFilterInterface<List>{
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
  selector: "app-companies",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"]
})
export class ListsComponent extends GridableComponent<List>
  implements OnInit {
  getFreshElement = getFreshList




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
    listService : ListService,
    alertService: AlertsService,
    router: Router
  ) {
    super(listService, alertService,router);
  }

  ngOnInit() {
    this.defaultFields = {id : true,name : true, description: true,denyList : true,domains : true}
    this.elementName = "List";
    this.elementNamePlural = "Lists";
    this.newElement = this.getFreshElement()
    this.getSome([],this.defaultFields);
    this.domainService.getSome([],{ url : true})
      .subscribe(
        (elements) => {
          this.domains = elements;
        }
      );
  }

  addList(list){
    this.newElement = list
    this.add()
  }
}
