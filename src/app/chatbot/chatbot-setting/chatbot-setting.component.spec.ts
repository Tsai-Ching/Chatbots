import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotSettingComponent } from './chatbot-setting.component';

describe('ChatbotSettingComponent', () => {
  let component: ChatbotSettingComponent;
  let fixture: ComponentFixture<ChatbotSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatbotSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
