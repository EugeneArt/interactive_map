angular
  .module('app')
  .component('headerComponent', {
    templateUrl: '/src/components/header/headerView.html',
    bindings: {},
    controller: headerComponentsController
  })
;

function headerComponentsController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }

}