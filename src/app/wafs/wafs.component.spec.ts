import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WafsComponent } from './wafs.component';

describe('WafsComponent', () => {
  let component: WafsComponent;
  let fixture: ComponentFixture<WafsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WafsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WafsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
