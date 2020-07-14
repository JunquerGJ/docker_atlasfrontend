import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetService } from '../assets.service';
import { AlertsService } from '../../../app/alerts.service';
import { HttpParams } from '@angular/common/http';
import Asset from '../../shared/models/asset';
import Server from 'src/app/shared/models/server';
import Contact from 'src/app/shared/models/contact';
import Domain from 'src/app/shared/models/domain';
import Characteristic from 'src/app/shared/models/characteristic';
import { CharacteristicService } from 'src/app/characteristics/characteristics.service';
import { ContactService } from 'src/app/contacts/contacts.service';
import { DomainService } from 'src/app/domains/domains.service';
import { ServerService } from 'src/app/servers/servers.service';
import ContactToEntity from 'src/app/shared/models/contacttoentity';
import { AreaService } from 'src/app/areas/areas.service';
import Area from 'src/app/shared/models/area';
import * as moment from 'moment'
import { getFreshContactTo } from 'src/app/shared/functions/utils';
import { AppConstants } from 'src/app/shared/constants/constants';
@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  @Input() input: Asset;
  @Output() updated = new EventEmitter<Asset>()
  asset: Asset;
  public characteristics: Characteristic[]
  public servers: Server[]
  public contacts: Contact[]
  public domains: Domain[]
  public areas: Area[]

  public serverActive: Boolean
  public gdprActive: Boolean
  public dashboardActive: Boolean
  public domainsActive: Boolean
  public softwareActive: Boolean
  public contactsActive: Boolean
  public characteristicsActive: Boolean

  public addServer: Boolean

  public auxDomain: String = ""
  public auxCharacteristic: String = ""
  public auxServer: String = ""
  public auxArea: String = ""
  public auxContactTo: ContactToEntity
  public newContact: String = null

  public readonly _assetTypes;
  public readonly _states;
  public readonly _enviroments;
  public readonly _assetVisibilityTypes;
  public readonly _grcValues;
  public readonly _logValues;


  constructor(private assetService: AssetService, private serverService: ServerService, private characteristicService: CharacteristicService, private contactService: ContactService, private domainService: DomainService, private areaService: AreaService, private alertService: AlertsService) {
    this._states = AppConstants.statusTypes
    this._assetTypes = AppConstants.assetTypes
    this._enviroments = AppConstants.enviroments
    this._assetVisibilityTypes = AppConstants.assetVisibilityTypes
    this._grcValues = AppConstants.grcValues
    this._logValues = AppConstants.logValues
  }

  ngOnInit(): void {
    this.asset = this.input;

    this.auxContactTo = getFreshContactTo();
    this.serverService.getSome([], { id: true, hostname: true, ip: true })
      .subscribe(
        (elements) => {
          this.servers = elements;
        }
      );
    this.domainService.getSome([], {})
      .subscribe(
        (elements) => {
          this.domains = elements;
        }
      );
    this.contactService.getSome([], {})
      .subscribe(
        (elements) => {
          this.contacts = elements;
        }
      );
    this.areaService.getSome([], {})
      .subscribe(
        (elements) => {
          this.areas = elements;
        }
      );
    this.characteristicService.getSome([], {})
      .subscribe(
        (elements) => {
          this.characteristics = elements;
        }
      );



    this.getAssetDetails(this.input)
  }

  getAssetDetails = (asset: Asset) => {
    const aux = {
      characteristics: true,
      contacts: {
        select: {
          functionality: true,
          contact: true
        }
      },
      servers: {
        select: {
          id: true,
          hostname: true,
          ip: true
        }
      },
      id: true,
      area: true,
      Domain: true,
      name: true,
      alias: true,
      assetType: true,
      status: true,
      statusDate: true,
      description: true,
      confidentiality: true,
      integrity: true,
      availability: true,
      trazability: true,
      accessLogs: true,
      activityLogs: true,


    }
    const params = new HttpParams()
      .set('params', JSON.stringify(aux))


    this.assetService.get(asset.id, params)
      .subscribe((asset) => {
        this.asset = asset
        if (this.asset.area) {
          this.auxArea = this.asset.area.name
        }
      },
        error => {
          this.alertService.error(error.error.message)
        })
  }

  setArea(areaName) {
    var i = 0;
    for (i = 0; i < this.areas.length; i++) {
      if (this.areas[i].name == areaName) {
        this.asset.area = this.areas[i]
        return
      }
    }
    this.asset.area = null
  }


  setServer(name) {
    this.servers.forEach((server) => {
      if (server.hostname == name) {
        this.asset.servers.push(server)
        this.auxServer = ""
      }
    })
  }

  setDomain(url) {
    this.domains.forEach((domain) => {
      if (domain.url == url) {
        this.asset.Domain.push(domain)
        this.auxDomain = ""
      }
    })
  }

  toggleServer(server) {
    var aux = this.asset.servers.filter(elem => elem.hostname != server.hostname)
    this.asset.servers = aux
  }

  toggleDomain(domain) {
    var aux = this.asset.Domain.filter(elem => elem.url != domain.url)
    this.asset.Domain = aux
  }

  toggleCharacteristic(characteristic) {
    var aux = this.asset.characteristics.filter(elem => elem.name != characteristic.name)
    this.asset.characteristics = aux
  }

  setCharacteristic(charName) {
    var aux = true;
    this.characteristics.forEach((characteristic) => {
      if (characteristic.name == charName) {
        this.asset.characteristics.push(characteristic)
        aux = false;
      }
    })
    if (aux) {
      this.asset.characteristics.push({ name: charName })
    }
    this.auxCharacteristic = ""
  }

  isAuxContactComplete() {
    return this.auxContactTo.contact && this.auxContactTo.functionality
  }
  setContact(name) {
    this.contacts.forEach((contact) => {
      if (contact.name == name) {
        this.auxContactTo.contact = contact
        if (this.isAuxContactComplete()) {
          this.addContact()
        }
        return
      }
    })
  }

  toggleContact(contactName) {
    var aux = this.asset.contacts.filter(elem => elem.contact.name != contactName)
    this.asset.contacts = aux
  }


  addContact() {
    this.asset.contacts.push(this.auxContactTo)
    this.auxContactTo = getFreshContactTo()
    this.newContact = null
  }
  transformDate() {
    if (this.asset.statusDate) {
      this.asset.statusDate = moment(this.asset.statusDate, "DD/MM/YYYY").toDate()
    }
    console.log("AFTERS", this.asset.statusDate)
  }
  update() {
    if (this.asset.statusDate) {
      var pre = this.asset.statusDate
      this.asset.statusDate = moment(this.asset.statusDate, "DD/MM/YYYY").toDate()
    }
    this.updated.emit(this.asset)
    if (this.asset.statusDate) {
      this.asset.statusDate = pre
    }
  }

}
