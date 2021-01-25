import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdsDetailsComponent } from './ids-details.component';

describe('IdsDetailsComponent', () => {
  let component: IdsDetailsComponent;
  let fixture: ComponentFixture<IdsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
