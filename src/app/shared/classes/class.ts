import { ClrDatagridSortOrder } from "@clr/angular";
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AlertsService } from '../../alerts.service';
import { Subject } from 'rxjs';
import { ElementService } from '../interfaces/interfaces';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

class DatabaseElement {
    id : number
}

abstract class AddElementComponent< T extends DatabaseElement > {
    
    abstract validateElement(T) : string
    abstract getFreshElement() : T
     
    
    @Output() created = new EventEmitter<T>()
    public newElement : T
    
    create(){
        var result = this.validateElement(this.newElement)
        if(!result){
            this.created.emit(this.newElement)
          }else{
            this.alertService.error(result)
          }
    }

    constructor(private alertService : AlertsService){

    }
}

abstract class GridableComponent<T extends DatabaseElement > {
    public descSort: number = ClrDatagridSortOrder.DESC
    public addElementVisible: boolean = false
    public defaultFields : Object
    
    public filterVisible: boolean = false
    public elementName : string
    public elementNamePlural : string
    public columns : String[]
    public elements
    public elementSubject = new Subject<string>()
    public newElement : T
    public editElement : T
    public isModalVisible = false


    constructor(private elementService : ElementService<T>,private alertService: AlertsService, private router : Router) {
        
    }
    searchElement(elementName){
        if(elementName !== ''){
            this.elementSubject.next(elementName)
        }
    }
    getSome(filters : Object[],include : Object){
        this.elementService.getSome(filters,include)
        .subscribe(
            (elements) => {
              this.elements = elements;
            },
            error => {
              this.alertService.error(error.error.message)
              if(error.error.message == "Wrong authentication token"){
                this.router.navigate(["/login"])
              }
            }
          );
    }
    changeElementValues(element : T){
        let elementToUpdate : T = this.elements.find(this.findElements,[element.id])
        Object.assign(elementToUpdate,element)
    }
    findElements(e){
        return e.id = this[0]
    }
    add() {
        delete this.newElement.id;
        this.elementService.add(this.newElement)
            .subscribe(
                res => {
                    this.alertService.success(`${this.elementName} has been added`)
                    this.getSome([],this.defaultFields)
                    this.isModalVisible = false
                    this.newElement = this.getFreshElement()
                },
                error => {
                    this.alertService.error(error.error.message)
                    if(error.error.message == "Wrong authentication token"){
                        this.router.navigate(["/login"])
                      }
                  }
            )

    }
    modify(element : T){
        this.elementService.modify(element)
            .subscribe(
                res => {
                    this.alertService.success(`${this.elementName} has been modifyed`)                    
                },
                error => {
                    this.alertService.error(error.error.message)
                    if(error.error.message == "Wrong authentication token"){
                        this.router.navigate(["/login"])
                      }
                }
            )
    }
    
    delete(element : T ) : void{
        this.elementService.delete(element)
            .subscribe(()=> {
                this.alertService.success(`${this.elementName} has been deleted`)
                this.getSome([],this.defaultFields);
            },
        error => {
            this.alertService.error(error.error.message)
            if(error.error.message == "Wrong authentication token"){
                this.router.navigate(["/login"])
              }
        })
    }
    closeModal(){
        this.isModalVisible = false
        this.newElement = this.getFreshElement()
      }

    abstract getFreshElement() : T 
    


}



export {
    GridableComponent,
    DatabaseElement,
    AddElementComponent
}
 