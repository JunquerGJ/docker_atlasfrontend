import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import Area from 'src/app/shared/models/area';
import { getFreshArea, validArea } from 'src/app/shared/functions/utils';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from '../../shared/classes/class'

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent extends AddElementComponent<Area> implements OnInit, OnDestroy {

  getFreshElement = getFreshArea
  validateElement = validArea
  constructor(alertService:AlertsService) { 
    super(alertService)
  }
  ngOnDestroy(): void {
    
  }
  ngOnInit() : void {
    this.newElement = this.getFreshElement()
  }

}
