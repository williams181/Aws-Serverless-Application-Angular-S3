import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototipoPageComponent } from './prototipo-page.component';

describe('PrototipoPageComponent', () => {
  let component: PrototipoPageComponent;
  let fixture: ComponentFixture<PrototipoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototipoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototipoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
