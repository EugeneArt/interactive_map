angular
  .module('app')
  .component('selectCoordinateComponent', {
    templateUrl: '/src/components/selectCoordinate/selectCoordinateView.html',
    bindings: {
      graph: '<',
      startCoordinate: '<',
      object: '@'
    },
    controller: selectCoordinateComponentController
  })
;

function selectCoordinateComponentController($scope) {

  var vm = this;
  vm.$onInit = onInit;
  vm.activateAction = activateAction;
  vm.setCoordinateWall = setCoordinate;
  vm.getCoordinate = getCoordinate;

  function onInit() {
    vm.scheme = angular.element(document.querySelector("#scheme"));
  }
  
  function activateAction() {
    vm.scheme.unbind('click');

    if(vm.object) {
      vm.scheme.bind('click', getCoordinate);
    } else {
      vm.scheme.bind('click', setCoordinate);
    }
  }

  function setCoordinate(event) {
    if(event.target.localName === 'td') {
      var cellIndex = event.target.cellIndex;
      var parentTr = event.target.parentElement;
      var rowIndex = parentTr.rowIndex;

      event.target.style.backgroundColor = event.target.style.backgroundColor? '': 'red';
      vm.graph[rowIndex][cellIndex] = vm.graph[rowIndex][cellIndex] === 1? 0: 1;
    }
  }

  function getCoordinate(event) {
    if( event.target.localName === 'td') {
      var cellIndex = event.target.cellIndex;
      var parentTr = event.target.parentElement;
      var rowIndex = parentTr.rowIndex;

      switch(vm.object) {
        case 'terminal':
          console.log(vm.startCoordinate);
          if(Object.keys(vm.startCoordinate).length) {
            console.log('terminal delete');
            vm.startCoordinate = {};
            var oldInitialTerminal = angular.element(document.querySelector(".scheme-terminal__color"));
            oldInitialTerminal[0].remove('scheme-terminal__color');

          }
          vm.startCoordinate.latitude = cellIndex;
          vm.startCoordinate.longitude = rowIndex;
          event.target.classList.add("scheme-terminal","scheme-terminal__color");
          event.target.innerHTML = '<span class="scheme-terminal__dialog">Ваш терминал</span>';
          break;
        case 'building':
          if(Object.keys(vm.startCoordinate).length) {
            vm.startCoordinate = {};
            var oldInitialBuilding = angular.element(document.querySelector(".scheme-building__color"));
            oldInitialBuilding[0].remove('scheme-building__color');
          }
          vm.startCoordinate.latitude = cellIndex;
          vm.startCoordinate.longitude = rowIndex;
          event.target.classList.add("scheme-building","scheme-building__color");
          event.target.innerHTML = '<span class="scheme-building__dialog">Вход в здание</span>';
          break;
      }
    }
  }


}
