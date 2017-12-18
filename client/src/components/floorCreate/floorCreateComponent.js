angular
    .module('app')
    .component('floorCreateComponent', {
      templateUrl: '/src/components/floorCreate/floorCreateView.html',
      bindings: {
        buildings: '<'
      },
      controller: floorCreateComponentController
    })
;

function floorCreateComponentController(floorEntity, FileUploader, API_ENDPOINT, $scope, $state) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createMap = createMap;
  vm.saveScheme = saveScheme;
  vm.addRoom = addRoom;
  vm.addTerminal = addTerminal;
  vm.addPassageway = addPassageway;

  vm.uploader = new FileUploader({
    url: API_ENDPOINT + 'map/',
    alias: 'image',
    autoUpload: true,
    headers: {},
    onSuccessItem: function (file, response) {
      vm.model.map = response.id;
      createMap(response.image);
    }
  });

  function onInit() {
    vm.model = new floorEntity();
    // vm.model.building = vm.building;
    vm.model.entrance = {};
    vm.model.rooms = [];
    vm.container = angular.element(document.querySelector("#container"));
    vm.showForm = false;
  }

  function createMap(url) {
    var options = {
      container: vm.container,
      url: url,
      canvas: {
        width: 1080,
        height: 608,
        initialWidth: 1080,
        scale: false
      }
    };
    var map = new canvasRouteMap.CanvasRouteMap(options);
    map.ready(function () {
      vm.showForm = true;
      $scope.$apply();
    });
  }

  function addRoom() {
    vm.room = {};
    vm.model.rooms.push(vm.room);
  }

  function addTerminal() {
    vm.model.terminal = {};
    vm.model.terminal.coordinate = {};
  }
  
  function addPassageway() {
    vm.model.passageway = {};
    vm.model.passageway.coordinate = {};
  }

  function saveScheme() {
    if (!Object.keys(vm.model.terminal.coordinate).length) {
      delete vm.model.terminal;
    }
    vm.model.$save().then(function () {
      $state.reload();
    });
  }

}
