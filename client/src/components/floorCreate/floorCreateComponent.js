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

function floorCreateComponentController(floorEntity, FileUploader, API_ENDPOINT, $scope, $state, $stateParams, canvasMap) {

  var vm = this;
  vm.$onInit = onInit;
  vm.$onDestroy = onDestroy;
  vm.createMap = createMap;
  vm.saveFloor= saveFloor;
  vm.addRoom = addRoom;
  vm.closePopup = closePopup;
  vm.deleteEmptyCoordinates = deleteEmptyCoordinates;
  vm.removeRoom = removeRoom;
  vm.validateRooms = validateRooms;
  vm.cancel = cancel;

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
    vm.model.building = $stateParams.buildingId;
    vm.model.entrance = {};
    vm.model.rooms = [];
    vm.model.terminal = {};
    vm.model.terminal.coordinate = {};
    vm.model.passageway = {};
    vm.model.passageway.coordinate = {};

    vm.container = angular.element(document.querySelector("#container"));
    vm.showForm = false;
    vm.formError = false;
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

  function addRoom() {
    vm.room = {};
    vm.model.rooms.push(vm.room);
  }

  function saveFloor() {
    if(!Object.keys(vm.model.entrance).length) {
      vm.formError = !vm.formError;
      vm.popupMsg = 'Необходимо указать выход';
      return false;
    }else if(!vm.model.number) {
      vm.formError = !vm.formError;
      vm.popupMsg = 'Необходимо указать номер этажа';
      return false;
    } else if(validateRooms()) {
      vm.formError = !vm.formError;
      vm.popupMsg = 'Проверьте правильность заполнения информации по комнатам';
      return false;
    } else {
      vm.deleteEmptyCoordinates();
    }
    vm.model.$save().then(success, error);
    
    function success() {
      $state.go('admin.buildingList', {}, {reload: true});
    }
    
    function error(response) {
      console.log(response.data);
    }
  }
  
  function closePopup() {
    vm.formError = !vm.formError;
    vm.popupMsg = '';
  }

  function deleteEmptyCoordinates() {
    if(!Object.keys(vm.model.terminal.coordinate).length) {
      delete vm.model.terminal;
    }
    if(!Object.keys(vm.model.passageway.coordinate).length) {
      delete vm.model.passageway;
    }
    if(vm.model.rooms.length) {
      vm.model.rooms.forEach(function (item) {
        if(!Object.keys(item).length) {
          delete vm.model.rooms[item];
        }
      })
    }
  }
  
  function removeRoom(event, room) {
    var index = vm.model.rooms.indexOf(room);
    vm.model.rooms.splice(index,1)
  }

  function validateRooms() {
    var flag = false;
    vm.model.rooms.forEach(function (room) {
      if(!Object.keys(room.coordinate) || !room.number) {
          room.noValid = true;
          flag = !flag;
      }


    });
    return flag;
  }

  function cancel() {
     $state.go('admin.buildingList', {}, {reload: true});
  }

  var removeRoomListener = $scope.$on('removeRoomListener', removeRoom);

  function onDestroy() {
    $scope.$on('$destroy', removeRoomListener);
  }
}
