angular
  .module('app')
  .component('contentComponent', {
    templateUrl: '/src/components/content/contentView.html',
    bindings: {
        name: '@',
        item: '<'
    },
    controller: contentComponentController
  })
;

function contentComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }

}