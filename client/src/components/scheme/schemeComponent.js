angular
  .module('app')
  .component('schemeComponent', {
    templateUrl: '/src/components/scheme/schemeView.html',
    bindings: {
        schemelist: '<'
    },
    controller: schemeComponentController
  })
;

function schemeComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
      console.log('dsds');
  }
}
