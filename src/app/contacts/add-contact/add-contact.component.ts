import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { getFreshContact } from '../../shared/functions/utils'
import Contact from 'src/app/shared/models/contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, OnDestroy {

  public newElement : Contact

  @Output() created = new EventEmitter<Contact>()


  constructor() { }
  
  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.newElement = getFreshContact()
  }

  create(){
    delete this.newElement.id
    this.created.emit(this.newElement)
  }

}
