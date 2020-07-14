import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import Network from 'src/app/shared/models/network';
import { getFreshNetwork, validNetwork } from 'src/app/shared/functions/utils';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-network',
  templateUrl: './add-network.component.html',
  styleUrls: ['./add-network.component.scss']
})
export class AddNetworkComponent extends AddElementComponent<Network> implements OnInit,OnDestroy {

  getFreshElement = getFreshNetwork
  validateElement = validNetwork

  constructor(alertService : AlertsService) {
    super(alertService)
   }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = this.getFreshElement()
  }
}
