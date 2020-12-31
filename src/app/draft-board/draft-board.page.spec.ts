import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DraftBoardPage } from './draft-board.page';

describe('DraftBoardPage', () => {
  let component: DraftBoardPage;
  let fixture: ComponentFixture<DraftBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftBoardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DraftBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
