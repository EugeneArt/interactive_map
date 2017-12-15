angular
    .module('app')
    .component('buildingListComponent', {
      templateUrl: '/src/components/buildingList/buildingListView.html',
      bindings: {
        buildings: '<'
      },
      controller: buildingListComponentController
    })
;

function buildingListComponentController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

  }

}
