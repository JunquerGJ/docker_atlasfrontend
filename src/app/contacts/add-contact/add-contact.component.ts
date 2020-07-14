import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { getFreshContact, validContact } from '../../shared/functions/utils'
import Contact from 'src/app/shared/models/contact';
import { AlertsService } from 'src/app/alerts.service';
import { AddElementComponent } from 'src/app/shared/classes/class';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent extends AddElementComponent<Contact> implements OnInit, OnDestroy {

  getFreshElement = getFreshContact
  validateElement = validContact


  constructor(alertService : AlertsService) {
    super(alertService)
   }
  
  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = this.getFreshElement()
  }
}
