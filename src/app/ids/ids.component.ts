import { Component, OnInit } from "@angular/core";

import { IDSService } from "./ids.service";

import { AlertsService } from "src/app/alerts.service";

import { GridableComponent } from '../shared/classes/class'

import { getFreshIDS, getFreshServer,  } from '../shared/functions/utils'

import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface, ClrDatagridNumericFilterInterface } from '@clr/angular';

import { DomainService } from '../domains/domains.service';

import { Router } from '@angular/router';

import IDS from '../shared/models/ids';

import Server from '../shared/models/server';

import { ServerService } from '../servers/servers.service';



interface elementType {

  id: number

  name: string

}







class ServerComparator implements ClrDatagridComparatorInterface<IDS>{

  compare(a, b){

    if(a.servers.length==b.servers.length){

          return 0

      }else{

          if(a.servers.length<b.servers.length){

            return -1

          }else return 1

      }

    }

}



class ServerFilter implements ClrDatagridNumericFilterInterface<IDS>{

  accepts(item, low: number, high: number): boolean {

    if(low || low == 0){

      if(high || high == 0){

        return (item.servers.length<=high && item.servers.length>=low) 

      }else{

        return item.servers.length>=low

      }

    }else{

      if(high || high == 0)

        return item.servers.length<=high

    }

    return true

  }

  

}



@Component({
  selector: 'app-ids',
  templateUrl: './ids.component.html',
  styleUrls: ['./ids.component.scss']
})
export class IDSComponent extends GridableComponent<IDS>
  implements OnInit {
  getFreshElement = getFreshIDS




  public serverComparator = new ServerComparator()
  public serverFilter = new ServerFilter()

  public servers : Server[] = []

  
  public auxServer: Server;


  public addServer() {
    delete this.auxServer.id
    this.newElement.servers.push(this.auxServer);
    this.auxServer = getFreshServer()
  }

  setServer(name) {
    this.servers.forEach((server) => {
      if (server.hostname == name) {
        this.newElement.servers.push(server)
      }
    })
  }


  constructor(
    private serverService: ServerService,
    idsService : IDSService,
    alertService: AlertsService,
    router: Router
  ) {
    super(idsService, alertService,router);
  }

  ngOnInit() {
    this.defaultFields = {id : true,name : true, description: true,denyList : true,servers : true}
    this.elementName = "Ids";
    this.elementNamePlural = "Idss";
    this.newElement = this.getFreshElement()
    this.getSome([],this.defaultFields);
    this.serverService.getSome([],{ hostname : true})
      .subscribe(
        (elements) => {
          this.servers = elements;
        }
      );
  }

  addIDS(ids){
    this.newElement = ids
    this.add()
  }
}
