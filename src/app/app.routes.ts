import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/file-preview/file-preview').then(c => c.FilePreview)   
    }
];
