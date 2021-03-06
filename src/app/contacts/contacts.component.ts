import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contacts.service"
import { FormBuilder } from "@angular/forms";
import { GridableComponent } from '../shared/classes/class'
import Contact from '../shared/models/contact'
import { AlertsService } from "../alerts.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"]
})
export class ContactsComponent extends GridableComponent<Contact>
  implements OnInit {
  getFreshElement(): Contact {
    return { id : 0,  name : "", tlf : "", email : ""}
  }
  constructor(
    contactService: ContactService,
    alertService: AlertsService,
    router: Router
  ) {
    super(contactService, alertService,router);
  }

  ngOnInit() {
    this.elementName = "Contact";
    this.elementNamePlural = "Contacts";
    this.newElement = this.getFreshElement()
    this.getSome([],{});  
  }

  public addContact(contact){
    this.newElement = contact
    this.add()
  }
}
