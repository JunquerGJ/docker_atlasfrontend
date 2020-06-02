import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import Server from 'src/app/shared/models/server';
import { getFreshServer, getFreshContactTo } from 'src/app/shared/functions/utils';
import { IPService } from 'src/app/ips/ips.service';
import IP from 'src/app/shared/models/ip';
import { AssetService } from 'src/app/assets/assets.service';
import Asset from 'src/app/shared/models/asset';
import Characteristic from 'src/app/shared/models/characteristic';
import { CharacteristicService } from 'src/app/characteristics/characteristics.service';
import Contact from 'src/app/shared/models/contact';
import { ContactService } from 'src/app/contacts/contacts.service';
import ContactToEntity from 'src/app/shared/models/contacttoentity';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.scss']
})
export class AddServerComponent implements OnInit,OnDestroy {


  @Output() created = new EventEmitter<Server>()
  public newElement : Server
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

  constructor(private contactService : ContactService ,private ipService : IPService,private assetService : AssetService, private characteristicService : CharacteristicService) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.newElement = getFreshServer()
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
  }
  setIP(ipAddress) {
    this.ips.forEach((ip) => {
      if (ip.ip == ipAddress) {
        this.newElement.ip = ip
      }
    })
  }

  setAsset(name) {
    this.assets.forEach((asset) => {
      if (asset.name == name) {
        this.newElement.assets.push(asset)
        this.auxAsset=''
      }
    })
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


  addContact() {
    this.newElement.contacts.push(this.auxContactTo)
    this.auxContactTo = getFreshContactTo()
    this.newContact = null
  }

  create(){
    this.created.emit(this.newElement)
    this.newElement = getFreshServer()
  }

}
