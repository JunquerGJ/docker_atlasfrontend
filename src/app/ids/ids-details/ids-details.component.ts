import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import IDS from 'src/app/shared/models/ids';
import { AssetService } from 'src/app/assets/assets.service';
import { AlertsService } from 'src/app/alerts.service';
import { ServerService } from 'src/app/servers/servers.service';
import Server from 'src/app/shared/models/server';

@Component({
  selector: 'app-ids-details',
  templateUrl: './ids-details.component.html',
  styleUrls: ['./ids-details.component.scss']
})
export class IDSDetailsComponent implements OnInit {

  constructor(private serverService : ServerService, private assetService : AssetService, private alertService : AlertsService) { }
  @Input() input : IDS
  @Output() updated = new EventEmitter<IDS>()
  ids : IDS

  public servers : Server[]
  public auxServer: String = ""

  ngOnInit(): void {
    this.ids = this.input;

    this.serverService.getSome([], {})
      .subscribe(
        (elements) => {
          this.servers = elements;
        }
      );
  }

  setServer(hostname) {
    this.servers.forEach((server) => {
      if (server.hostname == hostname) {
        this.ids.servers.push(server)
      }
    })

    this.auxServer = ""
  }

  toggleServer(hostname) {
    var aux = this.ids.servers.filter(elem => elem.hostname != hostname)
    this.ids.servers = aux
  }

  update() {
    this.updated.emit(this.ids)
  }

}
