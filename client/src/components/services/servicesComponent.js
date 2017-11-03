angular
  .module('app')
  .component('servicesComponent', {
    templateUrl: '/src/components/services/servicesView.html',
    bindings: {
    },
    controller: servicesComponentController
  })
;

function servicesComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }

}