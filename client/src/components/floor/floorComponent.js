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

function floorComponentController(floorEntity, FileUploader, API_ENDPOINT, $scope, $state) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createMap = createMap;
  vm.getImage = getImage;
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
    vm.model.entrance = {};
    vm.model.rooms = [];
    vm.scheme = angular.element(document.querySelector("#scheme"));
    vm.canvas = document.createElement("canvas");
    vm.canvas.id = "container";
    vm.showForm = false;
  }

  function createMap(url) {
    getImage(url).then(function (img) {
      var width = img.width;
      var height = img.height;
      vm.canvas.width = width % 2 === 0 ? width - 1 : width;
      vm.canvas.height = height;
      vm.scheme.append(vm.canvas);
      var ctx = vm.canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      vm.showForm = true;
      $scope.$apply();
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
      img.src = url;
      img.setAttribute('crossOrigin', '');
    })
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
