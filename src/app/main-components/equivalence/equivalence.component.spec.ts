import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquivalenceComponent } from './equivalence.component';

describe('EquivalenceComponent', () => {
  let component: EquivalenceComponent;
  let fixture: ComponentFixture<EquivalenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquivalenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquivalenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
