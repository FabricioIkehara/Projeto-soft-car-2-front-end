import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientModalComponent } from './add-client-modal.component';

describe('AddClientModalComponent', () => {
  let component: AddClientModalComponent;
  let fixture: ComponentFixture<AddClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClientModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
