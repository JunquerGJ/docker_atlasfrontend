import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpsComponent } from './ips.component';

describe('IpsComponent', () => {
  let component: IpsComponent;
  let fixture: ComponentFixture<IpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
