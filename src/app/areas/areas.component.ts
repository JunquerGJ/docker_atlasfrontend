import { Component, OnInit } from "@angular/core";
import { AreaService } from "./areas.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import { getFreshArea } from '../shared/functions/utils'
import Area from '../shared/models/area'
import { ClrDatagridComparatorInterface, ClrDatagridNumericFilterInterface } from '@clr/angular';



class AssetComparator implements ClrDatagridComparatorInterface<Area>{
  compare(a, b){
    if(a.Asset.length==b.Asset.length){
          return 0
      }else{
          if(a.Asset.length<b.Asset.length){
            return -1
          }else return 1
      }
    }
}

class AssetFilter implements ClrDatagridNumericFilterInterface<Area>{
  accepts(item, low: number, high: number): boolean {
    if(low || low == 0){
      if(high || high == 0){
        return (item.Asset.length<=high && item.Asset.length>=low) 
      }else{
        return item.Asset.length>=low
      }
    }else{
      if(high || high == 0)
        return item.Asset.length<=high
    }
    return true
  }
}


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

  public assetComparator = new AssetComparator()
  public assetFilter = new AssetFilter()

  ngOnInit() {
    this.elementName = "Area";
    this.defaultFields = {id : true, name : true, description : true, Asset : true}
    this.elementNamePlural = "Areas";
    this.newElement = this.getFreshElement()
    this.getSome([],this.defaultFields);  
  }

  addArea(area){
    this.newElement = area
    this.add()
  }
}
