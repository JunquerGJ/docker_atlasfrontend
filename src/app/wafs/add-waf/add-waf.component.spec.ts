import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWafComponent } from './add-waf.component';

describe('AddWafComponent', () => {
  let component: AddWafComponent;
  let fixture: ComponentFixture<AddWafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
