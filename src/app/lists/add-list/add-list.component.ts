import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import List from 'src/app/shared/models/list';
import { getFreshList, validList } from 'src/app/shared/functions/utils';
import Domain from 'src/app/shared/models/domain';
import { DomainService } from 'src/app/domains/domains.service';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent extends AddElementComponent<List> implements OnInit, OnDestroy {


  getFreshElement = getFreshList
  validateElement = validList
  public domains : Domain[]

  @Input() fromDomain : boolean = false



public auxDomain: String = ""
  constructor(private domainService : DomainService, alertService : AlertsService) {
    super(alertService)
   }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.newElement = getFreshList()
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
