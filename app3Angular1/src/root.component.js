import angular from 'angular';

angular
    .module('app')
    .component('root', {
        template: `
            <div style="margin-top: 100px;">
            Cela a été rendu par App3 qui est écrit en Angular 1.6
            </div>
            
            <a href="#/app3/subroute1">Subroute 1</a>
            <a href="#/app3/subroute2">Subroute 2</a>
            
            <ui-view />
        `,
        controllerAs: 'vm',
        controller($timeout) {
            const vm = this;
        }
    });
