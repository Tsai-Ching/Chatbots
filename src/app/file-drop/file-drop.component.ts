import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-drop',
  standalone: true,
  imports: [],
  templateUrl: './file-drop.component.html',
  styleUrl: './file-drop.component.scss'
})
export class FileDropComponent implements OnInit {
  @Input('lable') label: string = '';
  @Input('allowedExtensions') allowedExtensions: string[] = [];
  @Input('allowMultipleFiles') allowMultipleFiles: boolean = false;
  @Output('onFileDropped') onFileDropped: EventEmitter<FileList> = new EventEmitter<FileList>();

  files: File[] = [];
  allowedTypes: string = '';
  incorrectInput: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.allowedTypes = this.allowedExtensions.length > 0 ?
      this.allowedExtensions.join(', ') : 'any';
  }

  onFileSelected(event: any) {
    this.handleDrop(event.target.files);
  }

  onFileDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.handleDrop(event.target.files);
  }

  /**
   * 處理錯誤 - 上傳多個檔案
   * 處理錯誤 - 檔案不符合格式
   * 顯示已上傳檔案
   * 發射已上傳檔案
   */
  handleDrop(files: FileList) {
    console.log('handleDrop is called'); // 確認這裡是否執行
    if (!this.allowMultipleFiles && files.length > 1) {
      this.incorrectInput = true;
      this.errorMessage = 'Only one file can be uploaded at a time.';
      return;
    }

    if (!this.validateFiles(files)) {
      this.incorrectInput = true;
      this.errorMessage = 'Incorrect extension noticed';
      return;
    }
    this.files = Array.from(files);
    this.onFileDropped.emit(files);
  }

  private validateFiles(files: FileList): boolean {
    if (this.allowedExtensions.length === 0) return true;
    const extensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
    const extensions: string[] = [];
    Array.from(files).forEach(file => {
      const match = file.name.toLowerCase().match(extensionPattern);
      if (match) extensions.push(match[0]);
    });

    const invalid = extensions.filter(extension =>
      !this.allowedTypes.includes(extension)
    );
    return invalid.length === 0;
  }
}
