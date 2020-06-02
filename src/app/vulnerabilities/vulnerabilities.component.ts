import { Component, OnInit } from "@angular/core";
import { VulnerabilityService } from "./vulnerabilities.service";
import { FormBuilder } from "@angular/forms";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import { getFreshVulnerability } from '../shared/functions/utils'
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
@Component({
  selector: "app-companies",
  templateUrl: "./vulnerabilities.component.html",
  styleUrls: ["./vulnerabilities.component.scss"]
})
export class VulnerabilitiesComponent extends GridableComponent<Vulnerability>
  implements OnInit {
  getFreshElement = getFreshVulnerability


  

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
    //class="{{getLabel(vulnerability.risk)}}"
    var a = new Date(discoveryDate).getTime();
    if (resolutionDate) {
      var b = new Date(resolutionDate).getTime();
    } else {
      var b = new Date().getTime();
    }

    return Math.round((b - a) / (1000 * 60 * 60 * 24));
  }

  ngOnInit() {
    this.defaultFields = { id: true, status : true, asset: true, name: true, mitigationDate: true, discoveryDate: true, resolutionDate: true, risk: true } 
    this.elementName = "Vulnerability";
    this.elementNamePlural = "Vulnerabilities";
    this.newElement = this.getFreshElement()
    this.getSome([], this.defaultFields);

    

  }

  addVulnerability(vulnerability){
    this.newElement=vulnerability;
    this.add()
    this.isModalVisible=false
  }
}
