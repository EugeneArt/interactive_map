angular
  .module('app')
  .component('appComponent', {
    templateUrl: '/src/components/app/appView.html',
    bindings: { },
    controller: appComponentController
  })
;

function appComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }
}
