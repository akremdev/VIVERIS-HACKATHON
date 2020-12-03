import 'core-js/es7/reflect';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {MainModule} from './main-module';
import {environment} from '../environments/environment';
import { Router } from '@angular/router';

if (environment.production) {
    enableProdMode();
}

const spaProps = {
    bootstrappedModule: null,
    Router: Router
};

// Cette fonction de cycle de vie sera appelée par singleSPA exactement une fois, juste avant que l'application enregistrée ne soit montée pour la première fois.
export function bootstrap(props) {
    return Promise.resolve();
}


// Cette fonction de cycle de vie est appelée par singleSPA chaque fois que la route de cette application est active et que l'application doit être rendue.
export function mount(props) {
    createDomElement();

    return platformBrowserDynamic([
        {provide: 'localStoreRef', useValue: props.store },
        {provide: 'globalEventDispatcherRef', useValue: props.globalEventDistributor }])
        .bootstrapModule(MainModule).then(module => {
            return spaProps.bootstrappedModule = module;
        });
}

// Cette fonction de cycle de vie sera appelée lorsque l'utilisateur s'éloigne de cette route d'applications.
export function unmount(props) {
    return new Promise((resolve, reject) => {
        if (spaProps.Router) {
            const routerRef = spaProps.bootstrappedModule.injector.get(spaProps.Router);
            routerRef.dispose();
        }
        spaProps.bootstrappedModule.destroy();
        delete spaProps.bootstrappedModule;
        resolve();
    });
}

function createDomElement() {
 // Assurez-vous qu'il y a un div pour nous de rendre
    let el = window.document.getElementById('app2');
    if (!el) {
        el = window.document.createElement('app2');
        el.id = 'app2';
        window.document.body.appendChild(el);
    }

    return el;
}