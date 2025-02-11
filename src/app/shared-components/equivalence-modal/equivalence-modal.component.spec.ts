import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquivalenceModalComponent } from './equivalence-modal.component';

describe('EquivalenceModalComponent', () => {
  let component: EquivalenceModalComponent;
  let fixture: ComponentFixture<EquivalenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquivalenceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquivalenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
