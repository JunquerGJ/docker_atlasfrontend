import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Asset from 'src/app/shared/models/asset';
import { getFreshAsset, getFreshContactTo, getFreshDomain } from 'src/app/shared/functions/utils';
import { AreaService } from 'src/app/areas/areas.service';
import Area from 'src/app/shared/models/area';
import { AppConstants } from 'src/app/shared/constants/constants';
import { ServerService } from 'src/app/servers/servers.service';
import Server from 'src/app/shared/models/server';
import Characteristic from 'src/app/shared/models/characteristic';
import { CharacteristicService } from 'src/app/characteristics/characteristics.service';
import { ContactService } from 'src/app/contacts/contacts.service';
import Contact from 'src/app/shared/models/contact';
import ContactToEntity from 'src/app/shared/models/contacttoentity';
import Domain from 'src/app/shared/models/domain';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {


  public newArea : String = null
  public auxArea: Area
  public auxDomain: Domain
  public auxServer: String = ""

  public newContact : String = null
  public newDomain : String = null
  public areas : Area[]
  public servers : Server[]
  public contacts : Contact[]
  public characteristics : Characteristic[]
  public auxContactTo: ContactToEntity
  @Output() created = new EventEmitter<Asset>()
  public auxCharacteristic : String = ""
  public newElement : Asset
  
  public dashboardActive: Boolean
  public serverActive: Boolean
  public urlsActive: Boolean
  public gdprActive: Boolean
  public serversActive: Boolean
  public characteristicsActive: Boolean
  public contactsActive: Boolean

  public readonly _assetTypes;
  public readonly _states;
  public readonly _enviroments;
  public readonly _assetVisibilityTypes;
  public readonly _grcValues;
  public readonly _logValues;

  constructor(private areaService : AreaService, private serverService : ServerService, private characteristicService : CharacteristicService, private contactService : ContactService) {
    this._states = AppConstants.statusTypes
    this._assetTypes = AppConstants.assetTypes
    this._enviroments = AppConstants.enviroments
    this._assetVisibilityTypes = AppConstants.assetVisibilityTypes
    this._grcValues = AppConstants.grcValues
    this._logValues = AppConstants.logValues
   }

  ngOnInit(): void {
    this.newElement = getFreshAsset()
    this.auxContactTo = getFreshContactTo();
    this.auxDomain = getFreshDomain()
    this.areaService.getSome([],{ name : true})
    .subscribe(
      (elements) => {
        this.areas = elements
      }
    )
    this.serverService.getSome([],{ hostname : true})
    .subscribe(
      (elements) => {
        this.servers = elements
      }
    )
    this.characteristicService.getSome([],{ name : true})
    .subscribe(
      (elements) => {
        this.characteristics = elements
      }
    )
    this.contactService.getSome([],{ name : true})
    .subscribe(
      (elements) => {
        this.contacts = elements
      }
    )
  }

  transformDate() {
    if (this.newElement.statusDate) { 
      this.newElement.statusDate = new Date(this.newElement.statusDate) 
    }
  } 

  create(){
    delete this.newElement.id
    this.transformDate()
    this.created.emit(this.newElement)
  }

  addArea(area){
    this.newElement.area = area
  }

  setArea(areaName) {
    this.areas.forEach((area) => {
      if (area.name == areaName) {
        this.newElement.area = area
      }
    })
  }

  setServer(name) {
    this.servers.forEach((server) => {
      if (server.hostname == name) {
        this.newElement.servers.push(server)
        this.auxServer = ''
      }
    })
  }

  setCharacteristic(charName) {
    var aux = true;
    this.characteristics.forEach((characteristic) => {
      if (characteristic.name == charName) {
        this.newElement.characteristics.push(characteristic)
        aux = false;
      }
    })
    if (aux) {
      this.newElement.characteristics.push({ name: charName })
    }
  }

  setContact(name) {
    this.contacts.forEach((contact) => {
      if (contact.name == name) {
        this.auxContactTo.contact = contact
      }
    })
  }


  addDomain(domain) {
    console.log(domain)
    this.newElement.Domain.push(domain)
    this.auxDomain = getFreshDomain()
    this.newDomain = null
  }

  addContact() {
    this.newElement.contacts.push(this.auxContactTo)
    this.auxContactTo = getFreshContactTo()
    this.newContact = null
  }


}
