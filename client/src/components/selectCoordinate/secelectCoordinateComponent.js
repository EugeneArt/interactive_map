angular
  .module('app')
  .component('selectCoordinateComponent', {
    templateUrl: '/src/components/selectCoordinate/selectCoordinateView.html',
    bindings: {
      graph: '<',
      startCoordinate: '<',
      name: '<',
      object: '@'
    },
    controller: selectCoordinateComponentController
  })
;

function selectCoordinateComponentController() {

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
          if(Object.keys(vm.startCoordinate).length) {
            vm.startCoordinate = {};
            var oldInitialTerminal = angular.element(document.querySelector(".scheme-terminal__color"));
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
            var oldInitialBuilding = angular.element(document.getElementById(vm.startCoordinate.longitude + "_" + vm.startCoordinate.latitude ));
            oldInitialBuilding[0].remove('scheme-building__color');
            vm.startCoordinate = {};
          }
          vm.startCoordinate.latitude = cellIndex;
          vm.startCoordinate.longitude = rowIndex;
          event.target.setAttribute("id", rowIndex + "_"+ cellIndex);
          event.target.classList.add("scheme-building","scheme-building__color");
          event.target.innerHTML = '<span class="scheme-building__dialog">Вход в здание: ' + vm.name + '</span>';
          break;
        case 'room':
          if(Object.keys(vm.startCoordinate).length) {
            var oldInitialBuilding = angular.element(document.getElementById(vm.startCoordinate.longitude + "_" + vm.startCoordinate.latitude ));
            oldInitialBuilding[0].remove('scheme-room__color');
            vm.startCoordinate = {};
          }
          vm.startCoordinate.latitude = cellIndex;
          vm.startCoordinate.longitude = rowIndex;
          event.target.setAttribute("id", rowIndex + "_"+ cellIndex);
          event.target.classList.add("scheme-room","scheme-room__color");
          event.target.innerHTML = '<span class="scheme-room__dialog">Комната №: ' + vm.name + '</span>';
          break;
        case 'entrance':
          if(Object.keys(vm.startCoordinate).length) {
            var oldInitialBuilding = angular.element(document.getElementById(vm.startCoordinate.longitude + "_" + vm.startCoordinate.latitude ));
            oldInitialBuilding[0].remove('scheme-entrance__color');
            vm.startCoordinate = {};
          }
          vm.startCoordinate.latitude = cellIndex;
          vm.startCoordinate.longitude = rowIndex;
          event.target.setAttribute("id", rowIndex + "_"+ cellIndex);
          event.target.classList.add("scheme-entrance","scheme-entrance__color");
          event.target.innerHTML = '<span class="scheme-entrance__dialog">Вход/Выход</span>';
          break;
      }
    }
  }


}
