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
  vm.getImage = getImage;
  vm.createBinaryArray = createBinaryArray;
  vm.drawPath = drawPath;

  function onInit() {

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
      var roomCoordinate = data.roomCoordinate;
      vm.currentFloor = data.currentFloor;
      vm.otherFloor = data.otherFloor;

      if (vm.otherFloor) {
        mapEntity.fetchOne(vm.currentFloor.map).then(function (response) {
          var currentFloorContainer = angular.element(document.querySelector("#currentFloor"));
          createMap(currentFloorContainer, response.image, vm.currentFloor.terminal.coordinate, vm.currentFloor.entrance);
        });

        mapEntity.fetchOne(vm.otherFloor.map).then(function (response) {
          var otherFloorContainer = angular.element(document.querySelector("#otherFloor"));
          createMap(otherFloorContainer, response.image, vm.otherFloor.entrance, roomCoordinate);
        });

      } else {
        mapEntity.fetchOne(vm.currentFloor.map).then(function (response) {
          var currentFloorContainer = angular.element(document.querySelector("#currentFloor"));
          createMap(currentFloorContainer, response.image, vm.currentFloor.terminal.coordinate, roomCoordinate);
        });
      }
    }

    function fail(error) {
      console.log(error);
    }
  }

  function createMap(container, url, start, end) {
    var canvas = document.createElement("canvas");
    getImage(url).then(function (img) {
      var width = img.width;
      var height = img.height;
      canvas.width = width % 2 === 0 ? width - 1 : width;
      canvas.height = height;
      container.append(canvas);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var arr = createBinaryArray(canvas);
      drawPath(canvas, arr, start, end);
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
      img.crossOrigin = "Anonymous";
    })
  }

  function createBinaryArray(canvas) {
    var ctx = canvas.getContext("2d");
    var map = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var imdata = map.data;
    var r, g, b;
    var currentInnerArray;
    var zeroesAndOnes = [];
    for (var p = 0, len = imdata.length; p < len; p += 4) {
      r = imdata[p];
      g = imdata[p + 1];
      b = imdata[p + 2];

      if (p % canvas.width * 4 === 0) {
        currentInnerArray = [];
        zeroesAndOnes.push(currentInnerArray);
      }
      if (r === 255 && g === 255 && b === 255) {
        currentInnerArray.push(1);
      } else {
        currentInnerArray.push(0);
      }
    }
    ctx.putImageData(map, 0, 0);
    return zeroesAndOnes;
  }

  function drawPath(canvas, arr, start, end) {
    var graph = new Graph(arr, {diagonal: true});
    var startCoordinate = graph.grid[start.y][start.x];
    var endCoordinate = graph.grid[end.y][end.x];

    var path = astar.search(graph, startCoordinate, endCoordinate);
    console.log(graph, path);

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(start.x, start.y, 8, 8);
    ctx.fillRect(end.x, end.y, 8, 8);

    for (var i = 0; i < path.length; i += 9) {
      ctx.fillRect(path[i].y, path[i].x, 4, 4);
    }
  }

}
