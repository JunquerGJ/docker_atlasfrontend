import { Component, OnInit } from "@angular/core";
import { VulnerabilityService } from "./vulnerabilities.service";
import { FormBuilder } from "@angular/forms";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import { getFreshVulnerability, getFreshEvidence } from '../shared/functions/utils'
import Vulnerability from '../shared/models/vulnerability'
import { AppConstants } from '../shared/constants/constants';
import User from '../shared/models/user';
import { UserService } from '../administration/users/users.service';
import { ContactService } from '../contacts/contacts.service';
import Contact from '../shared/models/contact';
import Audit from '../shared/models/audit';
import Asset from '../shared/models/asset';
import { AuditService } from '../audits/audits.service';
import { AssetService } from '../assets/assets.service';
import Evidence from '../shared/models/evidence';
import { ClrDatagridComparatorInterface, ClrDatagridNumericFilterInterface } from '@clr/angular';


function getDays(discoveryDate, resolutionDate) {
  var a = new Date(discoveryDate).getTime();
  if (resolutionDate) {
    var b = new Date(resolutionDate).getTime();
  } else {
    var b = new Date().getTime();
  }

  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}



class DaysComparator implements ClrDatagridComparatorInterface<Vulnerability>{
  compare(a, b) {
    var daysA = getDays(a.discoveryDate,a.resolutionDate)
    var daysB = getDays(b.discoveryDate,b.resolutionDate)

    if (daysA == daysB) {
      return 0
    } else {
      if (daysA < daysB) {
        return -1
      } else return 1
    }
  }
}

class DaysFilter implements ClrDatagridNumericFilterInterface<Vulnerability>{
  accepts(item, low: number, high: number): boolean {
    var days = getDays(item.discoveryDate,item.resolutionDate)
    if(low || low == 0){
      if(high || high == 0){
        return (days<=high && days>=low) 
      }else{
        return days>=low
      }
    }else{
      if(high || high == 0)
        return days<=high
    }
    return true
  }
  
}

@Component({
  selector: "app-companies",
  templateUrl: "./vulnerabilities.component.html",
  styleUrls: ["./vulnerabilities.component.scss"]
})
export class VulnerabilitiesComponent extends GridableComponent<Vulnerability>
  implements OnInit {
  getFreshElement = getFreshVulnerability


  public daysComparator : DaysComparator = new DaysComparator()
  public daysFilter = new DaysFilter()

  public isEvidenceModalVisible = false;
  public newEvidence: Evidence = getFreshEvidence()

  constructor(
    vulnerabilityService: VulnerabilityService,
    alertService: AlertsService,
  ) {
    super(vulnerabilityService, alertService);
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

  getDays(discoveryDate, resolutionDate) {
    var a = new Date(discoveryDate).getTime();
    if (resolutionDate) {
      var b = new Date(resolutionDate).getTime();
    } else {
      var b = new Date().getTime();
    }

    return Math.round((b - a) / (1000 * 60 * 60 * 24));
  }

  ngOnInit() {
    this.defaultFields = { id: true, status: true, asset: true, name: true, mitigationDate: true, discoveryDate: true, resolutionDate: true, risk: true }
    this.elementName = "Vulnerability";
    this.elementNamePlural = "Vulnerabilities";
    this.newElement = this.getFreshElement()
    this.getSome([], this.defaultFields);



  }

  transformDate() {
    if (this.newElement.discoveryDate) {
      this.newElement.discoveryDate = new Date(this.newElement.discoveryDate)
    }
    if (this.newElement.mitigationDate) {
      this.newElement.mitigationDate = new Date(this.newElement.mitigationDate)
    }
    if (this.newElement.resolutionDate) {
      this.newElement.resolutionDate = new Date(this.newElement.resolutionDate)
    }
  }
  addVulnerability(vulnerability) {
    this.transformDate()
    this.newElement = vulnerability;
    this.add()
  }

  openEvidenceModal() {
    this.isEvidenceModalVisible = true;
  }

  addEvidence() {
    console.log(this.newEvidence)
    this.isEvidenceModalVisible = false;
  }
}
