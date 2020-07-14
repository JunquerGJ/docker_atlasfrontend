import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Asset from 'src/app/shared/models/asset';
import { getFreshAsset, getFreshContactTo, getFreshDomain, validAsset } from 'src/app/shared/functions/utils';
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
import { AlertsService } from 'src/app/alerts.service';
import { DomainService } from 'src/app/domains/domains.service';
import { AddElementComponent } from 'src/app/shared/classes/class';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent extends AddElementComponent<Asset> implements OnInit {

  getFreshElement = getFreshAsset
  validateElement = validAsset

  public newArea: String = null
  public auxArea: String = ""
  public auxDomain: String = ""
  public auxServer: String = ""

  public newContact: String = null
  public newServer: String = null
  public newDomain: String = null
  public areas: Area[]
  public servers: Server[]
  public contacts: Contact[]
  public domains: Domain[]
  public characteristics: Characteristic[]
  public auxContactTo: ContactToEntity
  public auxCharacteristic: String = ""

  public dashboardActive: Boolean
  public serverActive: Boolean
  public domainsActive: Boolean
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

  constructor(private areaService: AreaService, private serverService: ServerService, private characteristicService: CharacteristicService, private contactService: ContactService, alertService: AlertsService, private domainService: DomainService) {
    super(alertService)
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
    this.areaService.getSome([], { name: true })
      .subscribe(
        (elements) => {
          this.areas = elements
        }
      )

    this.domainService.getSome([], { url: true })
      .subscribe(
        (elements) => {
          this.domains = elements
        }
      )

    this.serverService.getSome([], { hostname: true })
      .subscribe(
        (elements) => {
          this.servers = elements
        }
      )
    this.characteristicService.getSome([], { name: true })
      .subscribe(
        (elements) => {
          this.characteristics = elements
        }
      )
    this.contactService.getSome([], { name: true })
      .subscribe(
        (elements) => {
          this.contacts = elements
        }
      )
  }



  addArea(area) {
    this.newElement.area = area
    this.newArea = 'AreaCreated'
  }




  setArea(areaName) {
    var i = 0;
    for (i < 0; i < this.areas.length; i++) {
      if (this.areas[i].name == areaName) {
        this.newElement.area = this.areas[i]
        return
      }
    }
    this.auxArea = ''
    this.newElement.area = null
  }

  setServer(name) {
    this.servers.forEach((server) => {
      if (server.hostname == name) {
        this.newElement.servers.push(server)
      }
    })
    this.auxServer = ''
    this.newServer = null
  }


  setDomain(url) {
    var i = 0;
    for (i = 0; i < this.domains.length; i++) {
      if (this.domains[i].url == url) {
        this.newElement.Domain.push(this.domains[i])
      }
    }
    this.auxDomain = ''
    this.newDomain = null
  }

  setContact(name) {
    this.contacts.forEach((contact) => {
      if (contact.name == name) {
        this.auxContactTo.contact = contact
      }
    })
  }

  setCharacteristic(charName) {
    var aux = true;
    this.characteristics.forEach((characteristic) => {
      if (characteristic.name == charName) {
        this.newElement.characteristics.push(characteristic)
        aux = false;
        this.auxCharacteristic = ''
      }
    })
    if (aux) {
      this.newElement.characteristics.push({ name: charName })
      this.auxCharacteristic = ''
    }
  }

  toggleDomain(domain) {
    var aux = this.newElement.Domain.filter(elem => elem.url != domain.url)
    this.newElement.Domain = aux
  }

  toggleServer(server) {
    var aux = this.newElement.servers.filter(elem => elem.hostname != server.hostname)
    this.newElement.servers = aux
  }


  toggleContact(contact) {
    var aux = this.newElement.contacts.filter(elem => elem.contact.name != contact.contact.name)
    this.newElement.contacts = aux
  }




  addDomain(domain) {
    this.newElement.Domain.push(domain)
    this.auxDomain = ''
    this.newDomain = null
  }

  addServer(server) {
    this.newElement.servers.push(server)
    this.auxServer = ''
    this.newServer = null
  }

  addContact() {
    this.newElement.contacts.push(this.auxContactTo)
    this.auxContactTo = getFreshContactTo()
    this.newContact = null
  }


}
