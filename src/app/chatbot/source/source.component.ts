import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ChatbotService } from '../../chatbot/playground/chatbot.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileDropComponent } from '../../file-drop/file-drop.component';
import { UserService } from '../../user/user.service';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs';

@Component({
  selector: 'app-source',
  standalone: true,
  imports: [MenuModule, ButtonModule, FileDropComponent],
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss'
})
export class SourceComponent {
  router = inject(Router);
  userService = inject(UserService);
  chatbotService = inject(ChatbotService);

  trainSources: MenuItem[] | undefined;
  allowedExtensions = ['.pdf', '.txt'];
  allowMultipleFiles = false;
  extractedText: string = '';
  chatbotId: string = '';
  isLoadedFiles: string[] = [];

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
        this.chatbotId = data.id;
        console.log(this.chatbotId);

        this.router.navigate([`dashboard`, data.id]);
        console.log(this.chatbotId);
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
            break;
        }
        this.isLoadedFiles.push(file.name);
      });
    }
  }

  readTxt(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result as string;
      console.log(text);
      this.extractedText = text;
    };

    reader.onerror = () => {
      console.error('Error reading the file:', reader.error);
    };

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
        this.extractedText = pageText;
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
    console.log(this.chatbotId);
    this.userService.feedText(this.chatbotId, this.extractedText).subscribe(

      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      });
  }
}
