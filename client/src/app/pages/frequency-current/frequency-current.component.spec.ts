import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyCurrentComponent } from './frequency-current.component';

describe('FrequencyCurrentComponent', () => {
  let component: FrequencyCurrentComponent;
  let fixture: ComponentFixture<FrequencyCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencyCurrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
