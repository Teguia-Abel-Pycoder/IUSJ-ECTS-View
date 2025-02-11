import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvModalComponent } from './pv-modal.component';

describe('PvModalComponent', () => {
  let component: PvModalComponent;
  let fixture: ComponentFixture<PvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PvModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
