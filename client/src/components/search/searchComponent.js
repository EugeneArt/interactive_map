angular
  .module('app')
  .component('searchComponent', {
    templateUrl: '/src/components/search/searchView.html',
    bindings: {
      selectedRoom: '='
    },
    controller: searchComponentController
  })
;

function searchComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }
}
