import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Contact from 'src/app/shared/models/contact';
import { AlertsService } from 'src/app/alerts.service';
import { validContact } from 'src/app/shared/functions/utils';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  @Input() input : Contact
  contact : Contact
  @Output() updated = new EventEmitter<Contact>()

  constructor(private alertService : AlertsService) { }

  ngOnInit(): void {
    this.contact = this.input
  }

  update(){
    var result = validContact(this.contact)
    if(!result){
      this.updated.emit(this.contact)
    }else{
      this.alertService.error(result)
    }
  }

}
