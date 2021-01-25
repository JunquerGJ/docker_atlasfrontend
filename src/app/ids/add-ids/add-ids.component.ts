import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { getFreshIDS, validIDS } from 'src/app/shared/functions/utils';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';
import IDS from 'src/app/shared/models/ids';
import { ServerService } from 'src/app/servers/servers.service';
import Server from 'src/app/shared/models/server';

@Component({
  selector: 'app-add-ids',
  templateUrl: './add-ids.component.html',
  styleUrls: ['./add-ids.component.scss']
})
export class AddIDSComponent extends AddElementComponent<IDS> implements OnInit, OnDestroy {


  getFreshElement = getFreshIDS
  validateElement = validIDS
  public servers : Server[]

  @Input() fromServer : boolean = false



public auxServer: String = ""
  constructor(private serverService : ServerService, alertService : AlertsService) {
    super(alertService)
   }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.newElement = getFreshIDS()
    this.serverService.getSome([], { hostname : true})
      .subscribe(
        (elements) => {
          this.servers = elements;
        }
      );
  }

  

  setServer(hostname) {
    var i = 0;
    for(i<0;i<this.servers.length;i++){
      if(this.servers[i].hostname == hostname){
        this.newElement.servers.push(this.servers[i])
      }
    }
    this.auxServer = ''
  }
}