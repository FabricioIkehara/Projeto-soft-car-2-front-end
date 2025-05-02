import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSideComponent } from './menu-side.component';

describe('MenuSideComponent', () => {
  let component: MenuSideComponent;
  let fixture: ComponentFixture<MenuSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
