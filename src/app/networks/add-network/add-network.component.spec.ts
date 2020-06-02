import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNetworkComponent } from './add-network.component';

describe('AddNetworkComponent', () => {
  let component: AddNetworkComponent;
  let fixture: ComponentFixture<AddNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
