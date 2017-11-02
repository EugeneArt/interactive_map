angular
  .module('app')
  .component('headerComponent', {
    templateUrl: '/src/components/header/headerView.html',
    bindings: {},
    controller: headerComponentController
  })
;

function headerComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }

}