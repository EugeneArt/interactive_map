angular
  .module('app')
  .component('sidebarComponent', {
    templateUrl: '/src/components/sidebar/sidebarView.html',
    bindings: {
    },
    controller: sidebarComponentController
  })
;

function sidebarComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }

}