import 'zone.js';
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    // app1: l'URL "/ app1 / ..." est redirigée vers "http: // localhost: 9001 / ..." ceci est fait par le proxy webpack (webpack.config.js)
    loadingPromises.push(loadApp('app1', '/app1', '/app1/singleSpaEntry.js', '/app1/store.js', globalEventDistributor));

// app2: l'URL "/ app2 / ..." est redirigée vers "http: // localhost: 9002 / ..." ceci est fait par le proxy webpack (webpack.config.js)
    loadingPromises.push(loadApp('app2', '/app2', '/app2/singleSpaEntry.js', '/app2/store.js', globalEventDistributor));

    // app3: l'URL "/ app3 / ..." est redirigée vers "http: // localhost: 9003 / ..." ceci est fait par le proxy webpack (webpack.config.js)
    loadingPromises.push(loadApp('app3', '/app3', '/app3/singleSpaEntry.js', null, null)); // n'a pas de store, nous passons donc null

    // app4: l'URL "/ app4 / ..." est redirigée vers "http: // localhost: 9004 / ..." ceci est fait par le proxy webpack (webpack.config.js)
    loadingPromises.push(loadApp('app4', '/app4', '/app4/singleSpaEntry.js', null, null)); // n'a pas de magasin, nous passons donc null

    // app5: l'URL "/ app5 / ..." est redirigée vers "http: // localhost: 9005 / ..." ceci est fait par le proxy webpack (webpack.config.js)
    loadingPromises.push(loadApp('app5', '/app5', '/app5/singleSpaEntry.js', '/app5/store.js', globalEventDistributor));

    // attend que tous les stores soient chargés et que toutes les applications soient enregistrées avec singleSpa
    await Promise.all(loadingPromises);

    singleSpa.start();
}

init();

