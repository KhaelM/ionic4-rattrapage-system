import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectPage } from './disconnect.page';

describe('DisconnectPage', () => {
  let component: DisconnectPage;
  let fixture: ComponentFixture<DisconnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
