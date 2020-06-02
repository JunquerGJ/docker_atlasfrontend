import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import Area from 'src/app/shared/models/area';
import { getFreshArea } from 'src/app/shared/functions/utils';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent implements OnInit, OnDestroy {

public newElement : Area
@Output() created = new EventEmitter<Area>()

  constructor() { }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.newElement = getFreshArea()
  }

  create(){
    delete this.newElement.id
    this.created.emit(this.newElement)
  }

}
