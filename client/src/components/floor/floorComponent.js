angular
    .module('app')
    .component('floorComponent', {
      templateUrl: '/src/components/floor/floorView.html',
      bindings: {
        buildings: '<'
      },
      controller: floorComponentController
    })
;

function floorComponentController(floorEntity, FileUploader, API_ENDPOINT, $timeout, $state) {

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

      //fix!!!
      $timeout(function () {
        vm.showForm = true;
      }, 500);
    }
  });

  function onInit() {
    vm.model = new floorEntity();
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
      },
      map: {

      }
    };
    var map = new canvasRouteMap.CanvasRouteMap(options);
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
