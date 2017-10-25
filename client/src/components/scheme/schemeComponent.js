angular
  .module('app')
  .component('appComponent', {
    templateUrl: '/src/components/app/appView.html',
    bindings: {
        schemelist: '<'
    },
    controller: appComponentController
  })
;

function appComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
      console.log('dsds');
  }
}
