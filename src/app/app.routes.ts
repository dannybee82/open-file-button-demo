import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../app/components/file-preview/file-preview.component').then(c => c.FilePreviewComponent)        
    }
];
