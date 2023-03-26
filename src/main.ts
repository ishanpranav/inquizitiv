import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './scripts/AppModule';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
