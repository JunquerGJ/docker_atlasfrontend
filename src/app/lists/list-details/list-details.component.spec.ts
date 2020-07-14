import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistDetailsComponent } from './list-details.component';

describe('BlacklistDetailsComponent', () => {
  let component: BlacklistDetailsComponent;
  let fixture: ComponentFixture<BlacklistDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
