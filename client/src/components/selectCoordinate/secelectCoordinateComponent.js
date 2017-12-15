angular
    .module('app')
    .component('selectCoordinateComponent', {
      templateUrl: '/src/components/selectCoordinate/selectCoordinateView.html',
      bindings: {
        coordinate: '<',
        name: '@'
      },
      controller: selectCoordinateComponentController
    })
;

function selectCoordinateComponentController() {

  var vm = this;
  vm.$onInit = onInit;
  vm.activateAction = activateAction;
  vm.getCoordinate = getCoordinate;

  function onInit() {
    console.log(vm.coordinate, vm.name);
    vm.rectWidht = 6;
    vm.rectHeight = 6;
    vm.canvas = document.querySelector("#container").childNodes[0];
    vm.angCanvas = angular.element(document.querySelector("#container"));
    vm.ctx = vm.canvas.getContext("2d");

    switch (vm.name) {
      case 'terminal':
        vm.terminal = vm.coordinate;
        vm.ctx.fillStyle = "#336600";
        vm.ctx.fillRect(vm.coordinate.x, vm.coordinate.y, vm.rectWidht, vm.rectHeight);
        break;
      case 'entrance':
        vm.entrance = vm.coordinate;
        vm.ctx.fillStyle = "#606060";
        vm.ctx.fillRect(vm.coordinate.x, vm.coordinate.y, vm.rectWidht, vm.rectHeight);
        break;
      case 'room':
        console.log('room');
        vm.room = vm.coordinate;
        vm.ctx.fillStyle = "#FFFF00";
        vm.ctx.fillRect(vm.coordinate.x, vm.coordinate.y, vm.rectWidht, vm.rectHeight);
        break;
      case 'building':
        vm.building = vm.coordinate;
        vm.ctx.fillStyle = "#FFFF00";
        vm.ctx.fillRect(vm.coordinate.x, vm.coordinate.y, vm.rectWidht, vm.rectHeight);
        break;
      case 'passageway':
        vm.passageway = vm.coordinate;
        vm.ctx.fillStyle = "#791fd4";
        vm.ctx.fillRect(vm.coordinate.x, vm.coordinate.y, vm.rectWidht, vm.rectHeight);
        break;
    }

  }

  function activateAction() {
    vm.angCanvas.unbind('click');
    vm.angCanvas.bind('click', getCoordinate);
  }

  function getCoordinate(event) {
    vm.ctx.clearRect(vm.coordinate.x, vm.coordinate.y, vm.rectWidht, vm.rectHeight);

    var rect = vm.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    vm.coordinate.x = Math.round(x);
    vm.coordinate.y = Math.round(y);

    switch (vm.name) {
      case 'terminal':
        vm.terminal.x = vm.coordinate.x;
        vm.terminal.y = vm.coordinate.y;

        vm.ctx.fillStyle = "#336600";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
      case 'building':
        vm.building.x = vm.coordinate.x;
        vm.building.y = vm.coordinate.y;

        vm.ctx.fillStyle = "#00FFFF";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
      case 'room':
        vm.room.x = vm.coordinate.x;
        vm.room.y = vm.coordinate.y;

        vm.ctx.fillStyle = "#FFFF00";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
      case 'entrance':
        vm.entrance.x = vm.coordinate.x;
        vm.entrance.y = vm.coordinate.y;

        vm.ctx.fillStyle = "#606060";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
      case 'passageway':
        vm.passageway.x = vm.coordinate.x;
        vm.passageway.y = vm.coordinate.y;

        vm.ctx.fillStyle = "#791fd4";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
    }

  }

}
