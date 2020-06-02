import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServerService } from '../servers.service';
import { AlertsService } from '../../../app/alerts.service';
import { HttpParams } from '@angular/common/http';
import Server from '../../shared/models/server';
import Characteristic from 'src/app/shared/models/characteristic';
import { CharacteristicService } from 'src/app/characteristics/characteristics.service';
@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.scss']
})
export class ServerDetailsComponent implements OnInit {

  @Input() input : Server;
  server : Server;
  contactVisible : boolean
  @Output() updated = new EventEmitter()
  constructor(private characteristicService: CharacteristicService,private serverService : ServerService,private alertService: AlertsService) { }

  ngOnInit(): void {
    this.server = this.input
    this.server.characteristics = []
    this.server.contacts = []
    this.characteristicService.getSome([],{name : true})
    .subscribe(
      (elements) => {
        this.characteristics = elements;
      }
    );
    this.getServerDetails(this.input)
  }

  public characteristics: Characteristic[]

  getServerDetails = (server : Server) => {
    const aux = {
      characteristics : true,
      contacts : {
        include : {
          contact : true
        }
      }
    }
    const params = new HttpParams()
      .set('params',JSON.stringify(aux))

      this.serverService.get(server.id,params)
        .subscribe((server) => {
          this.server.characteristics = server.characteristics
          this.server.contacts = server.contacts
        },
        error => {
          this.alertService.error(error.error.message)
        })
  }

  toggleAsset(asset){
    var aux = this.server.assets.filter( elem =>  elem.name != asset.name )
    this.server.assets = aux
  }

  toggleContact(contactName){
    var aux = this.server.contacts.filter( elem =>  elem.contact.name != contactName )
    this.server.contacts = aux
  }

  toggleCharacteristic(characteristic){
    var aux = this.server.characteristics.filter( elem =>  elem.name != characteristic.name )
    this.server.characteristics = aux
  }

  setCharacteristic(charName) {
    var aux = true;
    this.characteristics.forEach((characteristic) => {
      if (characteristic.name == charName) {
        this.server.characteristics.push(characteristic)
        aux=false;
      }
    })
    if(aux){
      this.server.characteristics.push({ name : charName})
    }
  }

  update(){
    var auxAssets = []
    var auxContacts = []
    var auxCharacteristics = []
    var i = 0;
    for(i=0;i<this.server.assets.length;i++){
      auxAssets.push({ id : this.server.assets[i].id})
    }
    for(i=0;i<this.server.characteristics.length;i++){
      auxCharacteristics.push({ name : this.server.characteristics[i].name})
    }
    for(i=0;i<this.server.contacts.length;i++){
      auxContacts.push({ 
        functionality : this.server.contacts[i].functionality,
        contact : {
          connect : 
            { id : this.server.contacts[i].contact.id }

        }
        
      })
    }
    var aux = {
      id : this.server.id,
      ip : this.server.ip.id,
      hostname : this.server.hostname,
      assets : auxAssets,
      characteristics : auxCharacteristics,
      contacts : auxContacts
    }

    this.updated.emit(aux)
  }

}
