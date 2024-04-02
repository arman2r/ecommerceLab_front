import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaProductosComponent } from './galeria-productos.component';

describe('GaleriaProductosComponent', () => {
  let component: GaleriaProductosComponent;
  let fixture: ComponentFixture<GaleriaProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaleriaProductosComponent]
    });
    fixture = TestBed.createComponent(GaleriaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
