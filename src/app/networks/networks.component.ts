import { Component, OnInit } from "@angular/core";
import { NetworkService } from "./networks.service";
import { AlertsService } from "src/app/alerts.service";
import Network from "../shared/models/network"
import { getFreshNetwork } from '../shared/functions/utils'
import { GridableComponent } from '../shared/classes/class';
import { ClrDatagridNumericFilterInterface, ClrDatagridComparatorInterface } from '@clr/angular';
import { Router } from '@angular/router';





class NetworkComparator implements ClrDatagridComparatorInterface<Network>{
  compare(a, b){
    if(a.ips.length==b.ips.length){
          return 0
      }else{
          if(a.ips.length<b.ips.length){
            return -1
          }else return 1
      }
    }
}

class NetworkFilter implements ClrDatagridNumericFilterInterface<Network>{
  accepts(item, low: number, high: number): boolean {
    if(low || low == 0){
      if(high || high == 0){
        return (item.ips.length<=high && item.ips.length>=low) 
      }else{
        return item.ips.length>=low
      }
    }else{
      if(high || high == 0)
        return item.ips.length<=high
    }
    return true
  }
  
}




@Component({
  selector: "app-networks",
  templateUrl: "./networks.component.html",
  styleUrls: ["./networks.component.scss"]
})
export class NetworksComponent extends GridableComponent<Network>
  implements OnInit {



  getFreshElement = getFreshNetwork

  public networkFilter = new NetworkFilter()
  public networkComparator = new NetworkComparator()

  constructor(
    networkService: NetworkService,
    alertService: AlertsService,
    router: Router
  ) {
    super(networkService, alertService, router);
  }

public prepareModification(detail){
  var aux = Object.assign({},detail)
  delete aux.ips;
  this.modify(aux)
}

  ngOnInit() {
    this.elementName = "Network";
    this.defaultFields = {id: true, name : true, description : true,ips : true}
    this.elementNamePlural = "Networks";
    this.newElement = this.getFreshElement()
    this.getSome([],this.defaultFields);  
  }

  public addNetwork(network){
    this.newElement = network
    this.add()
  }
}
