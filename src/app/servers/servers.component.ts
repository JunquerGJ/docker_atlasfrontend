import { Component, OnInit } from "@angular/core";
import { ServerService } from "./servers.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import Server from '../shared/models/server'
import IP from '../shared/models/ip';
import { IPService } from '../ips/ips.service';
import Asset from '../shared/models/asset';
import { getFreshAsset, getFreshServer, getFreshContactTo } from '../shared/functions/utils'
import { AssetService } from '../assets/assets.service';
import { ContactService } from '../contacts/contacts.service';
import Contact from '../shared/models/contact';
import ContactToEntity from '../shared/models/contacttoentity';
import Characteristic from '../shared/models/characteristic';
import { CharacteristicService } from '../characteristics/characteristics.service';
import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface, ClrDatagridNumericFilterInterface } from '@clr/angular';

interface elementType {
  id: number
  name: string
}

class IPFilter implements ClrDatagridStringFilterInterface<IP>{
  accepts(item: any, search: string): boolean {
     if(item.ip){
       return (item.ip.ip.indexOf(search)>-1)
     }
     return false;
  }
}

class IPComparator implements ClrDatagridComparatorInterface<Server>{
  



    compare(a, b){
      if(a.ip){
        if(b.ip){
          if(a.ip.ip==b.ip.ip){
            return 0
          }else{
            if(a.ip.ip<b.ip.ip){
              return -1
            }else return 1
          }
        }else return -1
      }else if(b.ip){
        return 1
      }else return 0
    }
}

class AssetComparator implements ClrDatagridComparatorInterface<Server>{
  compare(a, b){
    if(a.assets.length==b.assets.length){
          return 0
      }else{
          if(a.assets.length<b.assets.length){
            return -1
          }else return 1
      }
    }
}

class AssetFilter implements ClrDatagridNumericFilterInterface<Server>{
  accepts(item, low: number, high: number): boolean {
    if(low || low == 0){
      if(high || high == 0){
        return (item.assets.length<=high && item.assets.length>=low) 
      }else{
        return item.assets.length>=low
      }
    }else{
      if(high || high == 0)
        return item.assets.length<=high
    }
    return true
  }
  
}

@Component({
  selector: "app-companies",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent extends GridableComponent<Server>
  implements OnInit {
  getFreshElement = getFreshServer




  public ipFilter = new IPFilter()
  public ipComparator = new IPComparator()
  public assetComparator = new AssetComparator()
  public assetFilter = new AssetFilter()

  public ips: IP[] = []
  public assets: Asset[] = []
  public contacts: Contact[] = []
  public characteristics: Characteristic[]

  public auxIP: String = ""
  
  public contactVisible: Boolean
  public characteristicVisible: Boolean
  public auxAsset: Asset;
  public auxContactTo: ContactToEntity

  public addAsset() {
    delete this.auxAsset.id
    this.newElement.assets.push(this.auxAsset);
    this.auxAsset = getFreshAsset()
  }

  setIP(ipAddress) {
    this.ips.forEach((ip) => {
      if (ip.ip == ipAddress) {
        this.newElement.ip = ip
      }
    })
  }

  setCharacteristic(charName) {
    var aux = true;
    this.characteristics.forEach((characteristic) => {
      if (characteristic.name == charName) {
        this.newElement.characteristics.push(characteristic)
        aux=false;
      }
    })
    if(aux){
      this.newElement.characteristics.push({ name : charName})
    }
  }

  updateIP(server, ipAddress) {
    this.ips.forEach((ip) => {
      if (ip.ip == ipAddress) {
        server.ip = ip
      }
    })
  }



  setAsset(name) {
    this.assets.forEach((asset) => {
      if (asset.name == name) {
        this.newElement.assets.push(asset)
      }
    })
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
  }






  constructor(
    private ipService: IPService,
    private assetService: AssetService,
    private characteristicService: CharacteristicService,
    private contactService: ContactService,
    serverService: ServerService,
    alertService: AlertsService
  ) {
    super(serverService, alertService);
  }

  ngOnInit() {
    this.defaultFields = {id : true,hostname : true,assets : true, ip : true}
    this.elementName = "Server";
    this.elementNamePlural = "Servers";
    this.newElement = this.getFreshElement()
    this.auxContactTo = getFreshContactTo();
    this.columns = ["Name"]
    this.getSome([],this.defaultFields);
    this.ipService.getSome([],{ ip : true})
      .subscribe(
        (elements) => {
          this.ips = elements;
        }
      );
    this.assetService.getSome([],{name : true})
      .subscribe(
        (elements) => {
          this.assets = elements;
        }
      );
    this.contactService.getSome([],{})
      .subscribe(
        (elements) => {
          this.contacts = elements;
        }
      );
    this.characteristicService.getSome([],{name : true})
      .subscribe(
        (elements) => {
          this.characteristics = elements;
        }
      );
  }

  addServer(server){
    this.newElement = server
    this.add()
    this.isModalVisible=false
    this.newElement = getFreshServer()
  }
}
