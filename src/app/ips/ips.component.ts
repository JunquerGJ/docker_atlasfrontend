import { Component, OnInit } from "@angular/core";
import { IPService } from "./ips.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import Ip from '../shared/models/ip'
import Network from '../shared/models/network';
import { NetworkService } from '../networks/networks.service';
import { getFreshIP } from '../shared/functions/utils'
import IP from '../shared/models/ip';
import { ClrDatagridStringFilterInterface, ClrDatagridComparatorInterface } from '@clr/angular';
import { of } from 'rxjs';
import { Router } from '@angular/router';


class ServerFilter implements ClrDatagridStringFilterInterface<IP>{
  accepts(item: any, search: string): boolean {
    if(item.Server[0]){
      return (item.Server[0].hostname.toUpperCase().indexOf(search.toUpperCase())>-1)
    }else{
      return false
    }
  }
}
class ServerComparator implements ClrDatagridComparatorInterface<IP>{
  compare(a, b){
    if(a.Server[0]){
      if(b.Server[0]){
        if(a.Server[0].hostname==b.Server[0].hostname){
          return 0
        }else{
          if(a.Server[0].hostname<b.Server[0].hostname){
            return -1
          }else return 1
        }
      }else return -1
    }else if(b.Server[0]){
      return 1
    }else return 0
  }
}

class NetworkFilter implements ClrDatagridStringFilterInterface<IP>{
  accepts(item: any, search: string): boolean {
      return (item.network.name.toUpperCase().indexOf(search.toUpperCase())>-1)
  }
}
class NetworkComparator implements ClrDatagridComparatorInterface<IP>{
  compare(a, b){
    if(a.network.name==b.network.name){
          return 0
      }else{
          if(a.network.name<b.network.name){
            return -1
          }else return 1
      }
    }
}

@Component({
  selector: "app-companies",
  templateUrl: "./ips.component.html",
  styleUrls: ["./ips.component.scss"]
})
export class IpsComponent extends GridableComponent<Ip>
  implements OnInit {
  getFreshElement = getFreshIP


  public serverFilter = new ServerFilter()
  public serverComparator = new ServerComparator()
  public networkFilter = new NetworkFilter()
  public networkComparator = new NetworkComparator()
  public networks : Network[] = []
  
  constructor(
    private networkService : NetworkService,
    ipService: IPService,
    alertService: AlertsService,
    router: Router
  ) {
    super(ipService, alertService, router);
  }

  setNetwork(name){
    this.networks.forEach((network)=>{
      if(network.name == name){
        this.newElement.network=network
      }
    })
  }

  updateNetwork(ip,name){
    this.networks.forEach((network)=>{
      if(network.name == name){
        ip.network=network
      }
    })
  }

  ngOnInit() {
    this.elementName = "IP";
    this.defaultFields = {id: true,ip : true,network : true, Server : true}
    this.elementNamePlural = "IPS";
    this.newElement = this.getFreshElement()
    this.columns = ["Name"]
    this.getSome([],this.defaultFields);
    console.log(this.elements)
    this.networkService.getSome([],{id : true, name : true})
        .subscribe(
            (elements) => {
              this.networks = elements;
            }
          ); 
  }


  addIP(ip){
    this.newElement = ip
    this.add()
  }
}
