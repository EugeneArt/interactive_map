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
  vm.get = get;

  function onInit() {
    vm.canvas = document.querySelector("#container");
    vm.angCanvas = angular.element(document.querySelector("#container"));
    vm.ctx = vm.canvas.getContext("2d");
    vm.tmpImgData = vm.ctx.getImageData(0, 0, vm.canvas.width, vm.canvas.height);
  }

  function activateAction() {
    vm.angCanvas.unbind('click');
    vm.angCanvas.bind('click', getCoordinate);
  }

  function get(event) {
    var rect = vm.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    vm.ctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
    vm.ctx.putImageData(vm.tmpImgData, 0, 0);

    vm.ctx.fillStyle = "#dd4";
    vm.ctx.fillRect(x, y, 6, 6);

    vm.coordinate.longitude = x;
    vm.coordinate.latitude = y;

    console.log(vm.coordinate);
  }

  function getCoordinate(event) {
    var rect = vm.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    vm.ctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
    vm.ctx.putImageData(vm.tmpImgData, 0, 0);

    switch (vm.name) {
      case 'terminal':
        vm.ctx.fillStyle = "#336600";
        vm.ctx.fillRect(x, y, 6, 6);
        break;
      case 'building':
        vm.ctx.fillStyle = "#00FFFF";
        vm.ctx.fillRect(x, y, 6, 6);
        break;
      case 'room':
        vm.ctx.fillStyle = "#FFFF00";
        vm.ctx.fillRect(x, y, 6, 6);
        break;
      case 'entrance':
        vm.ctx.fillStyle = "#606060";
        vm.ctx.fillRect(x, y, 6, 6);
        break;
    }
    vm.coordinate.longitude = Math.round(x);
    vm.coordinate.latitude = Math.round(y);
    console.log(vm.coordinate);
  }


}
