angular
  .module('app')
  .component('schemeComponent', {
    templateUrl: '/src/components/scheme/schemeView.html',
    bindings: {
      schemelist: '<'
    },
    controller: schemeComponentController
  })
;
function schemeComponentController(schemeEntity, FileUploader, API_ENDPOINT, $state) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createMap = createMap;
  vm.saveScheme = saveScheme;
  vm.addBuilding = addBuilding;
  vm.showForm = false;

  vm.uploader = new FileUploader({
    url: API_ENDPOINT + 'map/',
    alias: 'image',
    autoUpload: true,
    headers: {},
    onSuccessItem: function (file, response) {
      vm.model.map = response.id;
      vm.showForm = true;
      createMap(response.image);
    }
  });

  function onInit() {
    vm.model = new schemeEntity();
    vm.model.buildings = [];
    vm.container = angular.element(document.querySelector("#container"));
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

  function addBuilding() {
    vm.buildings = {};
    vm.model.buildings.push(vm.buildings);
  }

  function saveScheme() {
    vm.model.$save().then(function () {
      $state.reload();
    });
  }

}
