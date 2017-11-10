angular
  .module('app')
  .component('therapyContentComponent', {
    templateUrl: '/src/components/therapyContent/therapyContentView.html',
    bindings: {
        item: '<'
    },
    controller: therapyContentComponentController
  })
;

function therapyContentComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }

}