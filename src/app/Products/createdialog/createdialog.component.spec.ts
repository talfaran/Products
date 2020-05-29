import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedialogComponent } from './createdialog.component';

describe('CreatedialogComponent', () => {
  let component: CreatedialogComponent;
  let fixture: ComponentFixture<CreatedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
