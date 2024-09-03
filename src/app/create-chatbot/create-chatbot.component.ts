import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-create-chatbot',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './create-chatbot.component.html',
  styleUrl: './create-chatbot.component.scss'
})
export class CreateChatbotComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
        { label: 'New', icon: 'pi pi-plus' },
        { label: 'Search', icon: 'pi pi-search' }
      ];
  }

}
