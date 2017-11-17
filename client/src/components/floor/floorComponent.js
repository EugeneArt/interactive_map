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

function floorComponentController(floorEntity, FileUploader, API_ENDPOINT) {

  var vm = this;
  vm.$onInit = onInit;
  vm.createGraph = createGraph;
  vm.saveScheme = saveScheme;
  vm.addRoom = addRoom;

  vm.uploader = new FileUploader({
    url: API_ENDPOINT + 'imagelist/',
    alias: 'image',
    autoUpload: true,
    headers: {},
    onSuccessItem: function (file, response) {
        vm.model.map.image = response.id;
        vm.createGraph(response.image, response.widthOfImage, response.heightOfImage);
        vm.showForm = true;
    }
  });

  function onInit() {
    vm.model = new floorEntity();
    vm.model.map = {};
    vm.model.terminal = {};
    vm.model.terminal.coordinate = {};
    vm.model.entrance = {};
    vm.model.rooms = [];
    vm.scheme = angular.element(document.querySelector("#scheme"));
    vm.schemeArea = angular.element(document.querySelector("#scheme-area"));
    vm.showForm = false;
    vm.model.graph = [];
  }
  
  function createGraph(image, widthOfImage, heightOfImage) {
      vm.scheme.css('background-image',  'url(' + image + ')');
      var width = Math.ceil(widthOfImage/10);
      var heigth = Math.ceil(heightOfImage/10);

      /*
        fill graph
       */
      for (var i = 0; i < heigth; i++ ) {
        vm.model.graph[i] = [];
        for(var j = 0; j < width; j++) {
            vm.model.graph[i][j] = 1;
        }
      }

      /*
        create graph' table
       */
      for (var h = 0; h < heigth; h++ ) {
        var tr = angular.element('<tr></tr>');
        for(var w = 0; w < width; w++) {
             var td = angular.element('<td></td>');
             tr.append(td)
        }
        vm.schemeArea.append(tr);
      }
  }

  function addRoom() {
    vm.room = {};
    vm.model.rooms.push(vm.room);
  }

  function saveScheme() {
    console.log(vm.model);
    vm.model.$save();
  }

}
