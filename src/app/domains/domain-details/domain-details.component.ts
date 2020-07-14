import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Domain from 'src/app/shared/models/domain';
import { ListService } from 'src/app/lists/list.service';
import { AlertsService } from 'src/app/alerts.service';
import List from 'src/app/shared/models/list';
import { AppConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss']
})
export class DomainDetailsComponent implements OnInit {

  public readonly _enviroments;
  public readonly _clients;
  public infoActive : boolean
  public listActive : boolean
  public certificateActive : boolean
  
  constructor(private listService : ListService,  private alertService : AlertsService) {
    this._enviroments = AppConstants.enviroments
    this._clients = AppConstants.clients
   }
  @Input() input : Domain
  @Output() updated = new EventEmitter<Domain>()
  domain : Domain

  public lists : List[]
  public auxList: String = ""

  ngOnInit(): void {
    this.domain = this.input;

    this.listService.getSome([], {})
      .subscribe(
        (elements) => {
          this.lists = elements;
        }
      );
  }

  setList(name) {
    this.lists.forEach((list) => {
      if (list.name == name) {
        this.domain.lists.push(list)
      }
    })
    this.auxList = ""
  }



  toggleList(name) {
    var aux = this.domain.lists.filter(elem => elem.name != name)
    this.domain.lists = aux
  }

  update() {
    delete this.domain.asset
    delete this.domain.certificate
    this.updated.emit(this.domain)
  }

}
