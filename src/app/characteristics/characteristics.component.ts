import { Component, OnInit } from "@angular/core";
import { CharacteristicService } from "./characteristics.service";
import { AlertsService } from "src/app/alerts.service";
import { GridableComponent } from '../shared/classes/class'
import Characteristic from '../shared/models/characteristic'
import { ClrDatagridSortOrder } from '@clr/angular';
import { getFreshCharacteristic } from '../shared/functions/utils'

@Component({
  selector: "app-companies",
  templateUrl: "./characteristics.component.html",
  styleUrls: ["./characteristics.component.scss"]
})
export class CharacteristicsComponent 
  implements OnInit {
  getFreshElement = getFreshCharacteristic


  constructor(
    private characteristicService: CharacteristicService,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    this.elementName = "Characteristic";
    this.elementNamePlural = "Characteristics";
    this.newElement = this.getFreshElement()
    this.getSome([],{});  
  }

  public descSort: number = ClrDatagridSortOrder.DESC
    public addElementVisible: boolean = false
    
    
    public filterVisible: boolean = false
    public elementName : string
    public elementNamePlural : string
    public columns : String[]
    public elements

    public newElement : Characteristic
    public editElement : Characteristic
    public isModalVisible = false




    getSome(filters : Object[],include : Object){
        this.characteristicService.getSome(filters,include)
        .subscribe(
            (elements) => {
              this.elements = elements;
            },
            error => {
              this.alertService.error(error.error.message)
            }
          );
    }
    changeElementValues(element : Characteristic){
        let elementCharacteristicoUpdate : Characteristic = this.elements.find(this.findElements,[element.name])
        Object.assign(elementCharacteristicoUpdate,element)
    }
    findElements(e){
        return e.id = this[0]
    }
    add(){
        this.characteristicService.add(this.newElement)
            .subscribe(
                res => {
                    this.alertService.success(`${this.elementName} has been added`)
                    this.getSome([],{})
                },
                error => {
                    this.alertService.error(error.error.message)
                  }
            )
    }
    modify(element : Characteristic){
        this.characteristicService.modify(element)
            .subscribe(
                res => {
                    this.alertService.success(`${this.elementName} has been modifyed`)                    
                },
                error => {
                    this.alertService.error(error.error.message)
                }
            )
    }
    
    delete(element : Characteristic ) : void{
        this.characteristicService.delete(element)
            .subscribe(()=> {
                this.alertService.success(`${this.elementName} has been deleted`)
                this.getSome([],{});
            },
        error => {
            this.alertService.error(error.error.message)
        })
    }
    closeModal(){
        this.isModalVisible = false
        this.newElement = this.getFreshElement()
      }


}
