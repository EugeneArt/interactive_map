angular
  .module('app')
  .component('routeComponent', {
    templateUrl: '/src/components/route/routeView.html',
    bindings: {},
    controller: routeComponentController
  })
;

function routeComponentController(findPathEntity, mapEntity, FLOOR_ID) {

  var vm = this;
  vm.$onInit = onInit;
  vm.getPath = getPath;
  vm.createMap = createMap;
  vm.createSlide = createSlide;
  vm.slideToLeft = slideToLeft;
  vm.slideToRight = slideToRight;

  function onInit() {
    vm.mapContainer = angular.element(document.querySelector("#mapContainer"));
    vm.mapSlides = [];
    vm.activeSide = 0;
    vm.initialImageWidth = 1000;
  }

  function getPath() {

    var params = {
      params: {
        floor: FLOOR_ID,
        room: vm.selectedRoom.originalObject.id
      }
    };

    findPathEntity.fetchAll(params).then(success, fail);

    function success(result) {
      var data = result[0];
      vm.roomCoordinate = data.roomCoordinate;
      vm.currentFloor = data.currentFloor;
      vm.otherFloor = data.otherFloor;
      vm.currentPassagewayFloor = data.currentPassagewayFloor;
      vm.otherPassagewayFloor = data.otherPassagewayFloor;

      console.log(data.case);

      switch (data.case) {
        case 0:
          createSlide("Пройдите в комнату", vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.roomCoordinate, 0);
          break;
        case 1:
          createSlide("Пройдите к лифту", vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.entrance, 0);
          createSlide("Пройдите в комнату", vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate, 1);
          break;
        case 2:
          createSlide("Пройдите в проход", vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.roomCoordinate, 0);
          createSlide("Пройдите в комнату", vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate, 1);
          break;
        case 3:
          createSlide("Пройдите к лифту", vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.entrance, 0);
          createSlide("Пройдите в проход", vm.currentPassagewayFloor, vm.currentPassagewayFloor.entrance, vm.currentPassagewayFloor.passageway.coordinate, 1);
          createSlide("Пройдите в комнату", vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate, 2);
          break;
        case 4:
          createSlide("Пройдите к лифту", vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.entrance, 0);
          createSlide("Пройдите в проход", vm.otherPassagewayFloor, vm.otherPassagewayFloor.entrance, vm.otherPassagewayFloor.passageway.coordinate, 1);
          createSlide("Пройдите в комнату", vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate, 2);
          break;
        case 5:
          createSlide("Пройдите к лифту", vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.entrance, 0);
          createSlide("Пройдите в проход", vm.currentPassagewayFloor, vm.currentPassagewayFloor.entrance, vm.currentPassagewayFloor.passageway.coordinate, 1);
          createSlide("Пройдите к лифту", vm.otherPassagewayFloor, vm.otherPassagewayFloor.entrance, vm.otherPassagewayFloor.passageway.coordinate, 2);
          createSlide("Пройдите в комнату", vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate, 3);
          break;
      }
    }

    function fail(error) {
      console.log(error);
    }
  }

  function createSlide(text, floor, start, end, slide) {
    mapEntity.fetchOne(floor.map).then(function (response) {
      var container = document.createElement("div");
      var h1 = document.createElement("h1");
      var isActive = floor.id == FLOOR_ID;

      h1.textContent = text;
      container.append(h1);
      container.className = isActive ? 'map__item map__item_active' : 'map__item';
      vm.mapSlides[slide] = container;
      vm.mapContainer.append(container);
      createMap(container, response.image, start, end);
    });
  }

  function createMap(container, url, start, end) {
    var options = {
      container: container,
      url: url,
      canvas: {
        width: 1080,
        height: 608,
        initialWidth: 1080,
        scale: true
      },
      map: {
        startPoint: {
          coordinates: start
        },
        endPoint: {
          coordinates: end
        }
      }
    };
    var map = new canvasRouteMap.CanvasRouteMap(options);
  }

  function slideToLeft() {
    if (vm.activeSide !== 0) {
      vm.mapSlides[vm.activeSide].classList.remove('map__item_active');
      vm.activeSide -= 1;
      vm.mapSlides[vm.activeSide].classList.add('map__item_active');
    }
  }

  function slideToRight() {
    if ((vm.mapSlides.length - 1) !== vm.activeSide) {
      vm.mapSlides[vm.activeSide].classList.remove('map__item_active');
      vm.activeSide += 1;
      vm.mapSlides[vm.activeSide].classList.add('map__item_active');
    }
  }
}
