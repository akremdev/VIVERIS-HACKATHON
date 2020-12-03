import angular from 'angular';

angular
    .module('app')
    .component('subroute2', {
        template: `<div style="margin-top:20px">La sous-route 1 fonctionne!</div>`,
        controllerAs: 'vm',
        controller() {
            const vm = this;

        },
    });
