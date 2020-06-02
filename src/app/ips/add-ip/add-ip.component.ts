import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import IP from 'src/app/shared/models/ip';
import { getFreshIP } from 'src/app/shared/functions/utils';
import Network from 'src/app/shared/models/network';
import { NetworkService } from 'src/app/networks/networks.service';

@Component({
  selector: 'app-add-ip',
  templateUrl: './add-ip.component.html',
  styleUrls: ['./add-ip.component.scss']
})
export class AddIpComponent implements OnInit,OnDestroy {

  public newElement : IP
  public newNetwork : String = null
  @Output() created = new EventEmitter<IP>()
  public networks : Network[]

  constructor(private networkService : NetworkService) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = getFreshIP()
    this.networkService.getSome([],{ name : true})
    .subscribe(
      (elements) => {
        this.networks = elements
      }
    )
  }

  addNetwork(network){
    this.newElement.network = network
  }

  create(){
    this.created.emit(this.newElement)
    this.newElement = getFreshIP()
  }

  setNetwork(networkName){
    this.networks.forEach((network)=>{
      if(network.name == networkName){
        this.newElement.network = network
      }
    })
  }

}
