import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Domain from 'src/app/shared/models/domain';
import { DomainService } from 'src/app/domains/domains.service';
import { AssetService } from 'src/app/assets/assets.service';
import { AlertsService } from 'src/app/alerts.service';
import WAF from 'src/app/shared/models/waf';

@Component({
  selector: 'app-waf-details',
  templateUrl: './waf-details.component.html',
  styleUrls: ['./waf-details.component.scss']
})
export class WafDetailsComponent implements OnInit {

  constructor(private domainService : DomainService, private assetService : AssetService, private alertService : AlertsService) { }
  @Input() input : WAF
  @Output() updated = new EventEmitter<WAF>()
  waf : WAF

  public domains : Domain[]
  public auxDomain: String = ""

  ngOnInit(): void {
    this.waf = this.input;

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
        this.waf.domains.push(domain)
      }
    })

    this.auxDomain = ""
  }

  toggleDomain(url) {
    var aux = this.waf.domains.filter(elem => elem.url != url)
    this.waf.domains = aux
  }

  update() {
    this.updated.emit(this.waf)
  }

}
