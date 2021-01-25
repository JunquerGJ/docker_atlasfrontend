import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WafDetailsComponent } from './waf-details.component';

describe('WafDetailsComponent', () => {
  let component: WafDetailsComponent;
  let fixture: ComponentFixture<WafDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WafDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WafDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
