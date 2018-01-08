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

function schemeComponentController(schemeEntity, FileUploader, API_ENDPOINT, $state, $scope, canvasMap) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createMap = createMap;
  vm.saveScheme = saveScheme;
  vm.addBuilding = addBuilding;
  vm.cancel = cancel;
  vm.removeScheme = removeScheme;
  vm.onDestroy = onDestroy;
  vm.removeBuilding = removeBuilding;

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
    vm.isScheme = !!vm.schemelist.length;
    vm.showForm = false;
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
      }
    };
    var map = new canvasMap.CanvasRouteMap(options);
    map.ready(function () {
      vm.showForm = true;
      $scope.$apply();
    });
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

  function cancel() {
     $state.go('admin.sсhemeList', {}, {reload: true});
  }

  function removeScheme(scheme) {
    var s = new schemeEntity();
    var obj = angular.merge(s, scheme);
    obj.$destroy();
    $state.go('admin.sсhemeList', {}, {reload: true});
  }

  function removeBuilding(event, building) {
    var index = vm.model.buildings.indexOf(building);
    vm.model.buildings.splice(index, 1)
  }

  var removeBuildingListener = $scope.$on('removeBuildingListener', removeBuilding);

  function onDestroy() {
    $scope.$on('$destroy', removeBuildingListener);
  }

}
