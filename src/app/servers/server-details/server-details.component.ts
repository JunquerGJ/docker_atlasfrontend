import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServerService } from '../servers.service';
import { AlertsService } from '../../../app/alerts.service';
import { HttpParams } from '@angular/common/http';
import Server from '../../shared/models/server';
import Characteristic from 'src/app/shared/models/characteristic';
import { CharacteristicService } from 'src/app/characteristics/characteristics.service';
import { AssetService } from 'src/app/assets/assets.service';
import Asset from 'src/app/shared/models/asset';
import IP from 'src/app/shared/models/ip';
import { IPService } from 'src/app/ips/ips.service';
import ContactToEntity from 'src/app/shared/models/contacttoentity';
import { getFreshContactTo } from 'src/app/shared/functions/utils';
import Contact from 'src/app/shared/models/contact';
import { ContactService } from 'src/app/contacts/contacts.service';
@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.scss']
})
export class ServerDetailsComponent implements OnInit {

  @Input() input: Server;
  server: Server;
  contactVisible: boolean
  @Output() updated = new EventEmitter()
  constructor(private characteristicService: CharacteristicService, private assetService: AssetService, private serverService: ServerService, private ipService: IPService, private alertService: AlertsService, private contactService: ContactService) { }


  public dashboardActive: Boolean
  public softwareActive: Boolean
  public contactsActive: Boolean
  public characteristicsActive: Boolean

  public addAsset: Boolean
  public characteristics: Characteristic[]
  public assets: Asset[]
  public contacts: Contact[]
  public ips: IP[]


  public auxIP: String = ""
  public auxCharacteristic: String = ""
  public auxAsset: String = ""
  public auxContactTo: ContactToEntity
  public newContact: String = null

  ngOnInit(): void {
    this.server = this.input
    this.auxContactTo = getFreshContactTo();
    this.characteristicService.getSome([], { name: true })
      .subscribe(
        (elements) => {
          this.characteristics = elements;
        }
      );

    this.assetService.getSome([], {})
      .subscribe(
        (elements) => {
          this.assets = elements;
        }
      );
    this.ipService.getSome([], {})
      .subscribe(
        (elements) => {
          this.ips = elements;
        }
      );
    this.contactService.getSome([], {})
      .subscribe(
        (elements) => {
          this.contacts = elements;
        }
      );
    this.getServerDetails(this.input)
  }


  isAuxContactComplete() {
    return this.auxContactTo.contact && this.auxContactTo.functionality
  }

  getServerDetails = (server: Server) => {
    const aux = {
      characteristics: true,
      contacts: {
        include: {
          contact: true
        }
      },
      assets: true,
      ip: true,
      id: true,
      hostname: true
    }
    const params = new HttpParams()
      .set('params', JSON.stringify(aux))

    this.serverService.get(server.id, params)
      .subscribe((server) => {
        if (this.server.ip) {
          this.auxIP = this.server.ip.ip
        }
        this.server = server
      },
        error => {
          this.alertService.error(error.error.message)
        })
  }

  setIP(ipAddress) {
    var i = 0;
    for (i = 0; i < this.ips.length; i++) {
      if (this.ips[i].ip == ipAddress) {
        this.server.ip = this.ips[i]
        return
      }
    }
    this.server.ip = null
  }
  setAsset(name) {
    this.assets.forEach((asset) => {
      if (asset.name == name) {
        this.server.assets.push(asset)
        this.auxAsset = ""
      }
    })
  }

  toggleAsset(asset) {
    var aux = this.server.assets.filter(elem => elem.name != asset.name)
    this.server.assets = aux
  }

  toggleContact(contactName) {
    var aux = this.server.contacts.filter(elem => elem.contact.name != contactName)
    this.server.contacts = aux
  }

  toggleCharacteristic(characteristic) {
    var aux = this.server.characteristics.filter(elem => elem.name != characteristic.name)
    this.server.characteristics = aux
  }

  setCharacteristic(charName) {
    var aux = true;
    console.log(charName)
    this.characteristics.forEach((characteristic) => {
      if (characteristic.name == charName) {
        this.server.characteristics.push(characteristic)
        aux = false;
      }
    })
    if (aux) {
      this.server.characteristics.push({ name: charName })
    }
    this.auxCharacteristic = ""
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


  addContact() {
    this.server.contacts.push(this.auxContactTo)
    this.auxContactTo = getFreshContactTo()
    this.newContact = null
  }

  update() {
    console.log(this.server)
    this.updated.emit(this.server)
  }

}
