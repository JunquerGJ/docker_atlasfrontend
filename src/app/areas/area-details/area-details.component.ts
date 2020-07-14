import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Area from 'src/app/shared/models/area';
import { AlertsService } from 'src/app/alerts.service';
import { validArea } from 'src/app/shared/functions/utils';

@Component({
  selector: 'app-area-details',
  templateUrl: './area-details.component.html',
  styleUrls: ['./area-details.component.scss']
})
export class AreaDetailsComponent implements OnInit {

  @Input() input: Area
  area: Area;
  @Output() updated = new EventEmitter<Area>()



  constructor(private alertService: AlertsService) { }

  ngOnInit(): void {
    this.area = this.input
  }

  update() {
    var result = validArea(this.area)
    if (!result) {
      this.updated.emit(this.area)
    } else {
      this.alertService.error(result)
    }
  }

}
