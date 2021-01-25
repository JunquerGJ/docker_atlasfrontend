import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import WAF from 'src/app/shared/models/waf';
import { getFreshWAF, validWaf } from 'src/app/shared/functions/utils';
import Domain from 'src/app/shared/models/domain';
import { DomainService } from 'src/app/domains/domains.service';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-waf',
  templateUrl: './add-waf.component.html',
  styleUrls: ['./add-waf.component.scss']
})
export class AddWafComponent extends AddElementComponent<WAF> implements OnInit, OnDestroy {


  getFreshElement = getFreshWAF
  validateElement = validWaf
  public domains : Domain[]

  @Input() fromDomain : boolean = false



public auxDomain: String = ""
  constructor(private domainService : DomainService, alertService : AlertsService) {
    super(alertService)
   }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.newElement = getFreshWAF()
    this.domainService.getSome([], { url : true})
      .subscribe(
        (elements) => {
          this.domains = elements;
        }
      );
  }

  

  setDomain(url) {
    var i = 0;
    for(i<0;i<this.domains.length;i++){
      if(this.domains[i].url == url){
        this.newElement.domains.push(this.domains[i])
      }
    }
    this.auxDomain = ''
  }
}
