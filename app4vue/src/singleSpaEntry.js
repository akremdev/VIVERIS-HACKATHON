import Vue from 'vue'
import singleSpaVue from 'single-spa-vue';
import App from './App.vue'

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
        el: '#app4',
        render: h => h(App)
}
});

export const bootstrap = [
    vueLifecycles.bootstrap,
];

export function mount(props) {
    createDomElement();
    return vueLifecycles.mount(props);
}

export const unmount = [
    vueLifecycles.unmount,
];

function createDomElement() {
   // Assurez-vous qu'il y a un div pour nous de rendre
    let el = document.getElementById('app4');

    if (!el) {
        el = document.createElement('div');
        el.id = 'app4';
        document.body.appendChild(el);
    }
    return el;
}
