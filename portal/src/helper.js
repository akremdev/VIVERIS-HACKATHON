import * as singleSpa from 'single-spa'; 

export function hashPrefix(prefix) {
    return function (location) {
        return location.hash.startsWith(`#${prefix}`);
    }
}

export async function loadApp(name, hash, appURL, storeURL, globalEventDistributor) {
    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor};

    // essayez d'importer le module de store
    try {
        storeModule = storeURL ? await SystemJS.import(storeURL) : {storeInstance: null};
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // ajouter une référence du store aux customProps
        customProps.store = storeModule.storeInstance;

        // enregistrer le store avec globalEventDistributor
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }

    // enregistrer l'application avec singleSPA et passe une référence au store de l'application ainsi qu'une référence au globalEventDistributor
    singleSpa.registerApplication(name, () => SystemJS.import(appURL), hashPrefix(hash), customProps);
}