import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableConfigurationComponent } from './time-table-configuration.component';

describe('TimeTableConfigurationComponent', () => {
  let component: TimeTableConfigurationComponent;
  let fixture: ComponentFixture<TimeTableConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTableConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
