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
    vm.terminal = {};
    vm.entrance = {};
    vm.building = {};
    vm.room = {};
    vm.rectWidht = 6;
    vm.rectHeight = 6;
    vm.canvas = document.querySelector("#container");
    vm.angCanvas = angular.element(document.querySelector("#container"));
    vm.ctx = vm.canvas.getContext("2d");
    // vm.tmpImgData = vm.ctx.getImageData(0, 0, vm.canvas.width, vm.canvas.height);
  }

  function activateAction() {
    vm.angCanvas.unbind('click');
    vm.angCanvas.bind('click', getCoordinate);
  }

  function getCoordinate(event) {
    var rect = vm.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // vm.ctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
    // vm.ctx.putImageData(vm.tmpImgData, 0, 0);

    vm.coordinate.longitude = Math.round(x);
    vm.coordinate.latitude = Math.round(y);

    switch (vm.name) {
      case 'terminal':
        if (Object.keys(vm.terminal).length) {
          vm.ctx.clearRect(vm.terminal.longitude, vm.terminal.latitude, vm.rectWidht, vm.rectHeight);
        }
        vm.terminal.longitude = vm.coordinate.longitude;
        vm.terminal.latitude = vm.coordinate.latitude;

        vm.ctx.fillStyle = "#336600";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
      case 'building':
        if (Object.keys(vm.building).length) {
          vm.ctx.clearRect(vm.building.longitude, vm.building.latitude, vm.rectWidht, vm.rectHeight);
        }
        vm.building.longitude = vm.coordinate.longitude;
        vm.building.latitude = vm.coordinate.latitude;

        vm.ctx.fillStyle = "#00FFFF";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
      case 'room':
        if (Object.keys(vm.room).length) {
          vm.ctx.clearRect(vm.room.longitude, vm.room.latitude, vm.rectWidht, vm.rectHeight);
        }
        vm.room.longitude = vm.coordinate.longitude;
        vm.room.latitude = vm.coordinate.latitude;

        vm.ctx.fillStyle = "#FFFF00";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
      case 'entrance':
        if (Object.keys(vm.entrance).length) {
          vm.ctx.clearRect(vm.entrance.longitude, vm.entrance.latitude, 6, 6);
        }
        vm.entrance.longitude = vm.coordinate.longitude;
        vm.entrance.latitude = vm.coordinate.latitude;

        vm.ctx.fillStyle = "#606060";
        vm.ctx.fillRect(x, y, vm.rectWidht, vm.rectHeight);
        break;
    }

    console.log(vm.coordinate);
  }

}
