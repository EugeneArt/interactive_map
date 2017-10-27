angular
  .module('app')
  .component('buildingFormComponent', {
    templateUrl: '/src/components/buildingForm/buildingFormView.html',
    bindings: {
        building: '<'
    },
    require: {
        schemeComponent: '^schemeComponent'
    },
    controller: buildingFormComponentController
  });

function buildingFormComponentController() {

  var vm = this;
  vm.$onInit = onInit;
  vm.getCoordinate = getCoordinate;



  function onInit() {
      vm.building.start_coordinate = {};
      vm.scheme = angular.element(document.querySelector("#scheme"));
  }

  function getCoordinate() {
      vm.schemeComponent.isSetBuildingCoordinate = true;
      vm.scheme.bind('click', function (event) {
          if( event.target.localName === 'td') {
            var cellIndex = event.target.cellIndex;
            var parentTr = event.target.parentElement;
            var rowIndex = parentTr.rowIndex;

            // if(Object.keys(vm.model.map.start_coordinate).length) {
            //     vm.model.map.start_coordinate = {};
            //     var oldInitial = angular.element(document.querySelector(".initial"));
            //     oldInitial[0].remove('initial');
            // }

            vm.building.start_coordinate.latitude = cellIndex;
            vm.building.start_coordinate.longitude = rowIndex;
            event.target.classList.add("scheme-building","scheme-building__color");
            event.target.innerHTML = '<span class="scheme-building__dialog">' + vm.building.name + '</span>';

            vm.schemeComponent.isSetBuildingCoordinate = false;
            // vm.scheme.unbind('click');
          }
      });
  }

}