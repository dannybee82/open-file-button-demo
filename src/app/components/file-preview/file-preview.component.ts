import { Component, WritableSignal, inject, signal } from '@angular/core';
import { OpenFileComponent } from '../open-file/open-file.component';
import { LoadFilesInBrowserService } from '../../services/load-files-in-browser.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-file-preview',
  imports: [
    OpenFileComponent,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './file-preview.component.html',
  styleUrl: './file-preview.component.scss'
})
export class FilePreviewComponent {

  imagePreview: WritableSignal<string> = signal('');
  errorLoadingImage: WritableSignal<string> = signal('');

  isPdfValid: WritableSignal<boolean> = signal(false);
  errorLoadingPdf: WritableSignal<string> = signal('');

  private loadFilesInBrowser = inject(LoadFilesInBrowserService);

  loadImage($event: File): void {
    this.loadFilesInBrowser.readFile($event).subscribe((result: string | null) => {
      let imagePreview: string = result ? result : '';
      let errorMessage: string = result ? '' : 'An error occured while loading image file.';

      if(result) {
        if(this.loadFilesInBrowser.isAllowedFile($event, result) && this.loadFilesInBrowser.checkMaximumSize($event.size)) {
          imagePreview = result;
          errorMessage = '';
        } else {
          imagePreview = '';
          errorMessage = !this.loadFilesInBrowser.checkMaximumSize($event.size) ? 'Image exceeds 10MB.' : 'Image is invalid.'; 
        }           
      }

      this.errorLoadingImage.set(errorMessage);
      this.imagePreview.set(imagePreview);
    });
  }

  loadPdf($event: File): void {
    this.loadFilesInBrowser.readFile($event).subscribe((result: string | null) => {
      let isValid: boolean = false;
      let errorMessage: string = result ? '' : 'An error occured while loading PDF file.';
      
      if(result) {
        isValid = this.loadFilesInBrowser.isAllowedFile($event, result) && this.loadFilesInBrowser.checkMaximumSize($event.size) ? true : false;
        errorMessage = 
          (this.loadFilesInBrowser.isAllowedFile($event, result) && this.loadFilesInBrowser.checkMaximumSize($event.size)) 
            ? '' 
            : !this.loadFilesInBrowser.checkMaximumSize($event.size) 
              ? 'PDF exceeds 10MB.' 
              : 'PDF invalid.';
      }

      this.isPdfValid.set(isValid);
      this.errorLoadingPdf.set(errorMessage);
    });
  }

  removeImage(): void {
    this.imagePreview.set('');
    this.errorLoadingImage.set('');
  }

  removePdf(): void {
    this.isPdfValid.set(false);
    this.errorLoadingPdf.set('');
  }

}