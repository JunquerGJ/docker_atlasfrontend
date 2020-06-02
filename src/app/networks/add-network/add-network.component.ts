import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import Network from 'src/app/shared/models/network';
import { getFreshNetwork } from 'src/app/shared/functions/utils';

@Component({
  selector: 'app-add-network',
  templateUrl: './add-network.component.html',
  styleUrls: ['./add-network.component.scss']
})
export class AddNetworkComponent implements OnInit,OnDestroy {

public newElement : Network

@Output() created = new EventEmitter<Network>()

  constructor() { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = getFreshNetwork()
  }

  create(){
    delete this.newElement.id
    this.created.emit(this.newElement)
  }

}
