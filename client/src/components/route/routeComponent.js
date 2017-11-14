angular
  .module('app')
  .component('routeComponent', {
    templateUrl: '/src/components/route/routeView.html',
    bindings: { },
    controller: routeComponentController
  })
;

function routeComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
  }
}
