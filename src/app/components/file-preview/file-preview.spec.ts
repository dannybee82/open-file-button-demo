import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilePreview } from './file-preview';
import { describe, beforeEach, it, expect } from 'vitest';

describe('FilePreviewComponent', () => {
  let component: FilePreview;
  let fixture: ComponentFixture<FilePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePreview]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});