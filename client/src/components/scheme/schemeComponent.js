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

function schemeComponentController(schemeEntity, FileUploader, API_ENDPOINT) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createMap = createMap;
  vm.saveScheme = saveScheme;
  vm.addBuilding = addBuilding;
  vm.getImage = getImage;

  vm.uploader = new FileUploader({
    url: API_ENDPOINT + 'map/',
    alias: 'image',
    autoUpload: true,
    headers: {},
    onSuccessItem: function (file, response) {
      vm.model.map.image = response.id;
      console.log(response);
      createMap(response.image);
    }
  });

  function onInit() {
    vm.model = new schemeEntity();
    vm.model.map = {};
    vm.model.buildings = [];
    vm.scheme = angular.element(document.querySelector("#scheme"));
    vm.canvas = document.createElement("canvas");
    vm.canvas.id = "container";
    vm.showForm = false;
  }

  function createMap(url) {
    getImage(url).then(function (img) {
      //create canvas
      var width = img.width;
      var height = img.height;
      vm.canvas.width = width % 2 === 0 ? width - 1 : width;
      vm.canvas.height = height;
      vm.scheme.append(vm.canvas);
      var ctx = vm.canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    }).catch(function (img) {
      console.log(img);
    });
  }

  function getImage(url) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        resolve(img)
      };
      img.onerror = function () {
        reject(img)
      };
      img.src = url
    })
  }

  function addBuilding() {
    vm.buildings = {};
    vm.model.buildings.push(vm.buildings);
  }

  function saveScheme() {
    vm.model.$save();
  }


}
