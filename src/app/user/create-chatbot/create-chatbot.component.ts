import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ChatbotService } from '../../chatbot/playground/chatbot.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileDropComponent } from '../../file-drop/file-drop.component';
import { UserService } from '../user.service';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs';

@Component({
  selector: 'app-create-chatbot',
  standalone: true,
  imports: [MenuModule, ButtonModule, FileDropComponent],
  templateUrl: './create-chatbot.component.html',
  styleUrl: './create-chatbot.component.scss'
})
export class CreateChatbotComponent {
  router = inject(Router);
  userService = inject(UserService);
  chatbotService = inject(ChatbotService);

  trainSources: MenuItem[] | undefined;
  allowedExtensions = ['.pdf', '.txt'];
  allowMultipleFiles = false;
  extactedText: string = '';

  ngOnInit() {
    this.trainSources = [
      { label: 'Files', icon: 'pi pi-file' },
      { label: 'Text', icon: 'pi pi-align-left' },
      { label: 'Website', icon: 'pi pi-globe' },
      { label: 'Q&A', icon: 'pi pi-comments' }
    ];
  }

  onCreate() {
    this.chatbotService.createChatBot().subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate([`dashboard/chatbot`, data.id]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onFileDropped(files: FileList) {

    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        switch (file.type) {
          case 'application/pdf':
            this.readPDF(file);
            break;
          case 'text/plain':
            this.readTxt(file);
            break;
          default:
            console.error('Unsupported file type:', file.type);
            // 你可以顯示提示信息給用戶，表示這種類型的文件不支援
            break;
        }
      })
    }
  }
  readTxt(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      console.log(text);

      this.extactedText = text;
    }
    reader.onerror = (e) => {
      console.error(e.target?.error?.code);

    }
    reader.readAsText(file, "UTF-8");
  }

  async readPDF(file: File) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      try {
        const pdf = await pdfjsLib.getDocument({ data: reader.result! }).promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');

        console.log(pageText); // 打印頁面的文本內容

      }

      catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    reader.onerror = () => {
      console.error('Error reading the file:', reader.error);
    };
  }

  onTrain() {
    this.userService.feedText(this.extactedText);
  }
}
