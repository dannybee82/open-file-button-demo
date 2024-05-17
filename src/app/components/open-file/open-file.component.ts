import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class OpenFileComponent {

  @Input() buttonText?: string;
  @Input() fileExtensions?: string;
  @Input() allowMultipleSelection: boolean = false;
  @Input() isDisabled?: boolean = false;
  @Input() matIcon?: string = 'insert_drive_file';

  @Output() selectedFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() selectedFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

  onFileSelected(event: Event) {
    if (event) {
      const element = event.target as HTMLInputElement;

      if(!this.allowMultipleSelection) {
        if(element.files) {
          this.selectedFile.emit(element.files[0]);
        }       
      } else {
        if(element.files) {
          const arr: File[] = [];

          for(let i = 0; element.files.length; i++) {
            arr.push(element.files[i]);
          }

          this.selectedFiles.emit(arr);
        }        
      }        
    }
  }

}