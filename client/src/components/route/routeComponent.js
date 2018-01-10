angular
  .module('app')
  .component('routeComponent', {
    templateUrl: '/src/components/route/routeView.html',
    bindings: {},
    controller: routeComponentController
  })
;

function routeComponentController(findPathEntity, mapEntity, FLOOR_ID, $q, canvasMap, $stateParams, $state) {

  var vm = this;
  vm.$onInit = onInit;
  vm.getPath = getPath;
  vm.createSlide = createSlide;
  vm.slideToLeft = slideToLeft;
  vm.slideToRight = slideToRight;
  vm.selectSlide = selectSlide;
  vm.$onDestroy = onDestroy;

  function onInit() {
    vm.selectedRoom = {};
    vm.mapContainer = angular.element(document.querySelector("#mapContainer"));
    vm.mapSlides = [];
    vm.activeSide = 0;
    vm.loading = true;


    vm.instructions = {
      room: "Пройдите в комнату",
      elevator: "Пройдите к лифту",
      passageway: "Пройдите в проход"
    };

    //when find route from service or therapy
    if($stateParams.room) vm.getPath();
  }

  function getPath() {

    var params = {
      params: {
        floor: FLOOR_ID,
        room: $stateParams.room || vm.selectedRoom.originalObject.id
      }
    };


    findPathEntity.fetchAll(params).then(success, fail);

    function success(result) {
      var data = result[0];
      vm.selectedRoom = {};

      vm.roomCoordinate = data.roomCoordinate;
      vm.currentFloor = data.currentFloor;
      vm.otherFloor = data.otherFloor;
      vm.currentPassagewayFloor = data.currentPassagewayFloor;
      vm.otherPassagewayFloor = data.otherPassagewayFloor;

      switch (data.case) {
        //room is located on the same floor as a terminal
        case 0:
          createSlide(vm.instructions.room, vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.roomCoordinate)
            .then(function () {
              vm.loading = false;
            });
          break;
        //room is located on different floor as a terminal
        case 1:
          createSlide(vm.instructions.elevator, vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.entrance)
            .then(function () {
              return createSlide(vm.instructions.room, vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate)
                .then(function () {
                  vm.loading = false;
                });
            });
          break;
        //room is located on the same floor as a terminal in another building(by passageway)
        case 2:
          createSlide(vm.instructions.passageway, vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.passageway.coordinate)
            .then(function () {
              return createSlide(vm.instructions.room, vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate)
                .then(function () {
                  vm.loading = false;
                })
            });
          break;
        //room is located on the different floor as a terminal in another building(by passageway)
        case 3:
          createSlide(vm.instructions.elevator, vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.entrance)
            .then(function () {
              return createSlide(vm.instructions.passageway, vm.currentPassagewayFloor, vm.currentPassagewayFloor.entrance, vm.currentPassagewayFloor.passageway.coordinate)
                .then(function () {
                  return createSlide(vm.instructions.room, vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate)
                    .then(function () {
                      vm.loading = false;
                    })
                })
            });
          break;
        //room is located on the different floor as a terminal in another building(by passageway) and terminal is located in different floor as passageway
        case 4:
          createSlide(vm.instructions.passageway, vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.passageway.coordinate)
            .then(function () {
              return createSlide(vm.instructions.elevator, vm.otherPassagewayFloor, vm.otherPassagewayFloor.passageway.coordinate, vm.otherPassagewayFloor.entrance)
                .then(function () {
                  return createSlide(vm.instructions.room, vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate)
                    .then(function () {
                      vm.loading = false;
                    })
                })
            });
          break;
        //buildings with passageway, terminal and room are located on the different floors and buildings
        case 5:
          createSlide(vm.instructions.elevator, vm.currentFloor, vm.currentFloor.terminal.coordinate, vm.currentFloor.entrance)
            .then(function () {
              return createSlide(vm.instructions.passageway, vm.currentPassagewayFloor, vm.currentPassagewayFloor.entrance, vm.currentPassagewayFloor.passageway.coordinate)
                .then(function () {
                  return createSlide(vm.instructions.elevator, vm.otherPassagewayFloor, vm.otherPassagewayFloor.entrance, vm.otherPassagewayFloor.passageway.coordinate)
                    .then(function () {
                      return createSlide(vm.instructions.room, vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate)
                        .then(function () {
                          vm.loading = false;
                        });
                    })
                })
            });
          break;
      }
    }

    function fail(error) {
      console.log(error);
    }
  }

  function createSlide(text, floor, start, end) {
    return $q(function (resolve) {
      mapEntity.fetchOne(floor.map).then(function (response) {
        var container = document.createElement("div");
        var h1 = document.createElement("h1");
        var isActive = floor.id == FLOOR_ID;

        h1.textContent = text;
        container.append(h1);
        container.className = isActive ? 'map__item map__item_active' : 'map__item';
        vm.mapContainer.append(container);

        var options = {
          container: container,
          url: response.image,
          canvas: {
            width: 1080,
            height: 608,
            initialWidth: 1080,
            scale: true,
            zoom: 1
          },
          map: {
            startPoint: {
              coordinates: start,
              image: {
                url: './dist/img/pointA.png',
                width: 25,
                height: 35,
                position: 'up'
              }
            },
            endPoint: {
              coordinates: end,
              image: {
                url: './dist/img/pointB.png',
                width: 25,
                height: 35,
                position: 'up'
              }
            },
            route: {
              animateSpeed: 50,
              step: 15,
              drawing: {
                color: '#51ff05',
                printWeight: 5
              }
            }
          }
        };

        vm.map = new canvasMap.CanvasRouteMap(options);
        vm.map.ready(function () {
          vm.mapSlides.push(container);
          resolve();
        })
      });
    });

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
  
  function selectSlide(index) {
     vm.mapSlides[vm.activeSide].classList.remove('map__item_active');
     vm.activeSide = index;
     vm.mapSlides[vm.activeSide].classList.add('map__item_active');
  }

  function onDestroy() {

  }

}
