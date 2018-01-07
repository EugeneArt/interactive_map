angular
  .module('app')
  .component('infoComponent', {
    templateUrl: '/src/components/info/infoView.html',
    bindings: {},
    controller: infoComponentController
  })
;

function infoComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }

}