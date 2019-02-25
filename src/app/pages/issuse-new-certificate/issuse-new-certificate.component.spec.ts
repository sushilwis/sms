import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuseNewCertificateComponent } from './issuse-new-certificate.component';

describe('IssuseNewCertificateComponent', () => {
  let component: IssuseNewCertificateComponent;
  let fixture: ComponentFixture<IssuseNewCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuseNewCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuseNewCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
