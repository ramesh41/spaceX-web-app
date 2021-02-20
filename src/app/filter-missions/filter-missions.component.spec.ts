import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMissionsComponent } from './filter-missions.component';

describe('FilterMissionsComponent', () => {
  let component: FilterMissionsComponent;
  let fixture: ComponentFixture<FilterMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
