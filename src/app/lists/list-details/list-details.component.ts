import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import List from 'src/app/shared/models/list';
import Domain from 'src/app/shared/models/domain';
import { DomainService } from 'src/app/domains/domains.service';
import { AssetService } from 'src/app/assets/assets.service';
import { AlertsService } from 'src/app/alerts.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  constructor(private domainService : DomainService, private assetService : AssetService, private alertService : AlertsService) { }
  @Input() input : List
  @Output() updated = new EventEmitter<List>()
  list : List

  public domains : Domain[]
  public auxDomain: String = ""

  ngOnInit(): void {
    this.list = this.input;

    this.domainService.getSome([], {})
      .subscribe(
        (elements) => {
          this.domains = elements;
        }
      );
  }

  setDomain(url) {
    this.domains.forEach((domain) => {
      if (domain.url == url) {
        this.list.domains.push(domain)
      }
    })

    this.auxDomain = ""
  }

  toggleDomain(url) {
    var aux = this.list.domains.filter(elem => elem.url != url)
    this.list.domains = aux
  }

  update() {
    this.updated.emit(this.list)
  }

}
