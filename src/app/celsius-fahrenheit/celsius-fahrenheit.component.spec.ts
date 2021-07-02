import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelsiusFahrenheitComponent } from './celsius-fahrenheit.component';

describe('CelsiusFahrenheitComponent', () => {
  let component: CelsiusFahrenheitComponent;
  let fixture: ComponentFixture<CelsiusFahrenheitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelsiusFahrenheitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelsiusFahrenheitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
