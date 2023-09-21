import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { AppRoutingModule, routes } from './app/app.routes';
// import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

// bootstrapApplication(AppModule).catch(err => console.log(err));

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
});

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);