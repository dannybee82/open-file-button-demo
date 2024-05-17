import { Injectable } from '@angular/core';
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadFilesInBrowserService {

  private _allowedExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];  
  private _allowedTypes: string[] = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

  private readonly MAX_FILE_SIZE: number = 10 * (1024 * 1024);

  constructor() {}

  readFile(file: File): Observable<string | null> {
      return from(
          new Promise<string>((resolve, reject) => {
              const fr = new FileReader();
              fr.onerror = reject;
              fr.onload = () => {
                  resolve(fr.result as string);
              }
              fr.readAsDataURL(file);
          })
      )
  }

  isAllowedFile(file: File, base64: string): boolean {
    const extension: string = this.getFileExtension(file.name);
    const fileType: string = this.getFileType(base64);

    if(this._allowedExtensions.indexOf(extension) > -1 && this._allowedTypes.indexOf(fileType) > -1) {
      return true;
    }

    return false;
  }
  
  checkMaximumSize(size: number): boolean {
    if(size < this.MAX_FILE_SIZE) {
      return true;
    }

    return false;
  }

  getFileSize(base64: string): string {   
    let val: number = (base64.endsWith('==')) ? 2 : 1;
    let size: number = ((((base64.length - val) * 6) / 8) / 1000) / 1000;
    return parseFloat(size + "").toFixed(2);
  }

  private getFileExtension(fileName: string): string {
    let splitted: string[] = fileName.toLowerCase().split('.');
    let lastPart: number = splitted.length - 1;
    return splitted[lastPart];
  }

  private getFileType(base64: string): string {
    let fileType: string = base64.substring(0, base64.indexOf(";base64,"));
    fileType = fileType.replace("data:", "");
    return fileType;
  }

}