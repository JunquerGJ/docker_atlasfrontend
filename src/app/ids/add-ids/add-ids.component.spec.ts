import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIdsComponent } from './add-ids.component';

describe('AddIdsComponent', () => {
  let component: AddIdsComponent;
  let fixture: ComponentFixture<AddIdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
