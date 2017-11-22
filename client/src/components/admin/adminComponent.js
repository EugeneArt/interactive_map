angular
  .module('app')
  .component('adminComponent', {
    templateUrl: '/src/components/admin/adminView.html',
    bindings: { },
    controller: adminComponentController
  })
;

function adminComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
  }
}
