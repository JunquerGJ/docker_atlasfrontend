import { Component, OnInit } from "@angular/core";
import { AssetService } from "./assets.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import Asset from '../shared/models/asset'
import { getFreshAsset, getFreshDomain, getFreshContactTo, getVulnsRisk } from '../shared/functions/utils'
import { AppConstants } from 'src/app/shared/constants/constants';
import Contact from '../shared/models/contact';
import Domain from '../shared/models/domain';
import Characteristic from '../shared/models/characteristic';
import ContactToEntity from '../shared/models/contacttoentity';
import Area from '../shared/models/area';
import { ContactService } from '../contacts/contacts.service';
import { CharacteristicService } from '../characteristics/characteristics.service';
import Server from '../shared/models/server';
import Vulnerability from '../shared/models/vulnerability';
import { AreaService } from '../areas/areas.service';
import { ServerService } from '../servers/servers.service';
import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface } from '@clr/angular';
import { Router } from '@angular/router';



class AreaComparator implements ClrDatagridComparatorInterface<Asset>{

  compare(a, b){
    if(a.area.name==b.area.name){
          return 0
      }else{
          if(a.area.name<b.area.name){
            return -1
          }else return 1
      }
    }
}
class AreaFilter implements ClrDatagridStringFilterInterface<Area>{
  accepts(item: any, search: string): boolean {
     return (item.area.name.toUpperCase().indexOf(search.toUpperCase())>-1)
  }
}

class CharacteristicFilter implements ClrDatagridStringFilterInterface<Characteristic>{
  accepts(item: any, search: string): boolean {
    var i =0;
    for(i=0;i<item.characteristics.length;i++){
      if(item.characteristics[i].name.toUpperCase().includes(search.toUpperCase())){
        return true
      }
    }
    return false
  }
}

class VulnerabilityComparator implements ClrDatagridComparatorInterface<Asset>{
  compare(a, b): number {
    var riskA = getVulnsRisk(a.Vulnerability)
    var riskB = getVulnsRisk(b.Vulnerability) 
    console.log("riskA",riskA)
    console.log("riskB",riskB)
    if(riskA==riskB){
      return 0
  }else{
      if(riskA<riskB){
        return -1
      }else return 1
  }
  }
  
}


@Component({
  selector: "app-companies",
  templateUrl: "./assets.component.html",
  styleUrls: ["./assets.component.scss"]
})
export class AssetsComponent extends GridableComponent<Asset>
  implements OnInit {
  getFreshElement = getFreshAsset


  public characteristicFilter = new CharacteristicFilter()
  public areaFilter = new AreaFilter()
  public areaComparator = new AreaComparator()
  public vulnComparator = new VulnerabilityComparator()

  public serverVisible: Boolean


  public auxContact: Contact
  public domainVisible: boolean = false
  public contactVisible: boolean = false
  public isModalVisible2: boolean = false

  public contacts: Contact[] = []
  public areas: Area[];
  public servers: Server[];
  public characteristics: Characteristic[]
  public auxContactTo: ContactToEntity



getThing(vulnerabilities: Vulnerability[], risk: String) {
  let count = 0;
  let i = 0;
  for (i = 0; i < vulnerabilities.length; i++) {
    if (vulnerabilities[i].risk == risk) {
      count++;
    }
  }
  return count;
}








addContact() {
  this.newElement.contacts.push(this.auxContactTo)
  this.auxContactTo = getFreshContactTo()
}






constructor(
  private serverService: ServerService,
  private areaService: AreaService,
  private contactService: ContactService,
  private characteristicService: CharacteristicService,
  assetService: AssetService,
  alertService: AlertsService,
  router: Router
) {
  super(assetService, alertService,router);

}

ngOnInit() {
  this.elementName = "Asset";
  this.defaultFields = { id: true, name: true, accessLogs : true, activityLogs : true, area: true, status: true, assetType: true, risk: true, Vulnerability: true, confidentiality: true, authorization: true, alias : true,  statusDate : true, integrity: true, availability: true, trazability: true }
  this.elementNamePlural = "Assets";
  this.newElement = getFreshAsset()
  this.auxContactTo = getFreshContactTo()
  this.getSome([], this.defaultFields);

  this.contactService.getSome([], {})
    .subscribe(
      (elements) => {
        this.contacts = elements;
      }
    );

  this.serverService.getSome([], { hostname: true })
    .subscribe(
      (elements) => {
        this.servers = elements;
      }
    );


  this.characteristicService.getSome([], { name: true })
    .subscribe(
      (elements) => {
        this.characteristics = elements;
      }
    );
  this.areaService.getSome([], { name: true })
    .subscribe(
      (elements) => {
        this.areas = elements;
      }
    );


}

getBC(risk) {
  switch (risk) {
    case "CRITICAL":
      return "#8300ff"
    case "HIGH":
      return "red"
    case "MEDIUM":
      return "yellow"
    case "LOW":
      return "green"
  }
}

getFC(risk) {
  switch (risk) {
    case "CRITICAL":
      return "white"
    case "HIGH":
      return "white"
    case "MEDIUM":
      return "black"
    case "LOW":
      return "white"

  }
}

addAsset(asset){
  this.newElement = asset
  this.add()

}
}
