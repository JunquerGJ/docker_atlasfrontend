import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import Server from 'src/app/shared/models/server';
import { getFreshServer, getFreshContactTo, validServer } from 'src/app/shared/functions/utils';
import { IPService } from 'src/app/ips/ips.service';
import IP from 'src/app/shared/models/ip';
import { AssetService } from 'src/app/assets/assets.service';
import Asset from 'src/app/shared/models/asset';
import Characteristic from 'src/app/shared/models/characteristic';
import { CharacteristicService } from 'src/app/characteristics/characteristics.service';
import Contact from 'src/app/shared/models/contact';
import { ContactService } from 'src/app/contacts/contacts.service';
import ContactToEntity from 'src/app/shared/models/contacttoentity';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.scss']
})
export class AddServerComponent extends AddElementComponent<Server> implements OnInit,OnDestroy {

  getFreshElement = getFreshServer
  validateElement = validServer

  @Input() fromAsset : boolean = false

  public newIP : String = null
  public newContact : String = null
  public auxIP: String = ""
  public auxAsset: String = ""
  public auxCharacteristic : String = ""
  public auxContactTo: ContactToEntity
  public ips : IP[]
  public assets : Asset[]
  public characteristics : Characteristic[]
  public contacts : Contact[]
  public dashboardActive: Boolean
  public softwareActive: Boolean
  public characteristicsActive: Boolean
  public contactsActive: Boolean
  public assetVisible: Boolean

  constructor(private contactService : ContactService ,private ipService : IPService,private assetService : AssetService, private characteristicService : CharacteristicService, alertService : AlertsService) {
    super(alertService)
   }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.newElement = this.getFreshElement()
    this.auxContactTo = getFreshContactTo();
    this.ipService.getSome([],{ ip : true})
    .subscribe(
      (elements) => {
        this.ips = elements
      }
    )
    this.assetService.getSome([],{ name : true})
    .subscribe(
      (elements) => {
        this.assets = elements
      }
    )
    this.characteristicService.getSome([],{name : true})
    .subscribe(
      (elements) => {
        this.characteristics = elements;
      }
    );

    this.contactService.getSome([],{name : true})
    .subscribe(
      (elements) => {
        this.contacts = elements;
      }
    );
  }

  addIP(ip){
    this.newElement.ip = ip
    this.newIP='IPCreated'
  }

  setIP(ipAddress) {
    var i = 0;
    for(i<0;i<this.ips.length;i++){
      if(this.ips[i].ip == ipAddress){
        this.newElement.ip = this.ips[i]
        return
      }
    }
    this.auxIP = ''
  }



  setAsset(name) {
    this.assets.forEach((asset) => {
      if (asset.name == name) {
        this.newElement.assets.push(asset)
        this.auxAsset=''
      }
    })
    this.auxAsset=''
  }

  setCharacteristic(charName) {
    var aux = true;
    this.characteristics.forEach((characteristic) => {
      if (characteristic.name == charName) {
        this.newElement.characteristics.push(characteristic)
        aux=false;
        this.auxCharacteristic=''
      }
    })
    if(aux){
      this.newElement.characteristics.push({ name : charName})
      this.auxCharacteristic=''
    }
  }

  setContact(name) {
    this.contacts.forEach((contact) => {
      if (contact.name == name) {
        this.auxContactTo.contact = contact
      }
    })
  }

  toggleContact(contact) {
    var aux = this.newElement.contacts.filter(elem => elem.contact.name != contact.contact.name)
    this.newElement.contacts = aux
  }


  addContact() {
    this.newElement.contacts.push(this.auxContactTo)
    this.auxContactTo = getFreshContactTo()
    this.newContact = null
  }

}
