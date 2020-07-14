import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import IP from 'src/app/shared/models/ip';
import { getFreshIP, validIP } from 'src/app/shared/functions/utils';
import Network from 'src/app/shared/models/network';
import { NetworkService } from 'src/app/networks/networks.service';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-ip',
  templateUrl: './add-ip.component.html',
  styleUrls: ['./add-ip.component.scss']
})
export class AddIpComponent extends AddElementComponent<IP> implements OnInit,OnDestroy {

getFreshElement = getFreshIP
validateElement = validIP

  public auxNetwork : String = ""
  public newNetwork : String = null
  public networks : Network[]

  constructor(private networkService : NetworkService, alertService : AlertsService) { 
    super(alertService)
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = this.getFreshElement()
    this.networkService.getSome([],{ name : true})
    .subscribe(
      (elements) => {
        this.networks = elements
      }
    )
  }

  addNetwork(network){
    this.newElement.network = network
    this.newNetwork = "NetworkCreated"
  }

  

  setNetwork(networkName) {
    var i = 0;
    for(i<0;i<this.networks.length;i++){
      if(this.networks[i].name == networkName){
        this.newElement.network = this.networks[i]
        return
      }
    }
    this.auxNetwork = ''
  }

}
