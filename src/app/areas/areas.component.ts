import { Component, OnInit } from "@angular/core";
import { AreaService } from "./areas.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import { getFreshArea } from '../shared/functions/utils'
import Area from '../shared/models/area'
@Component({
  selector: "app-companies",
  templateUrl: "./areas.component.html",
  styleUrls: ["./areas.component.scss"]
})
export class AreasComponent extends GridableComponent<Area>
  implements OnInit {
  getFreshElement = getFreshArea
  constructor(
    areaService: AreaService,
    alertService: AlertsService
  ) {
    super(areaService, alertService);
  }

  ngOnInit() {
    this.elementName = "Area";
    this.elementNamePlural = "Areas";
    this.newElement = this.getFreshElement()
    this.getSome([],{id : true, name : true});  
  }

  addArea(area){
    this.newElement = area
    this.add()
    this.isModalVisible=false
  }
}
