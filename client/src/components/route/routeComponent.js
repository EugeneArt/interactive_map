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
  vm.getImage = getImage;
  vm.createBinaryArray = createBinaryArray;
  vm.drawPath = drawPath;
  vm.slideToLeft = slideToLeft;
  vm.slideToRight = slideToRight;
  vm.zoomIn = zoomIn;
  vm.zoomOut = zoomOut;

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
          createSlide("Пройдите в комнату",vm.otherFloor, vm.otherFloor.entrance, vm.roomCoordinate, 2);
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
        container.className = isActive? 'map__item map__item_active': 'map__item';
        vm.mapSlides[slide] = container;
        vm.mapContainer.append(container);
        createMap(container, response.image, start, end);
    });
  }

  function createMap(container, url, start, end) {
    var canvas = document.createElement("canvas");
    getImage(url).then(function (img) {
      vm.imageWidth = img.width;
      vm.imageHeight = img.height;
      canvas.width = vm.imageWidth % 2 === 0 ? vm.imageWidth - 1 : vm.imageWidth;
      canvas.height = vm.imageHeight;
      container.append(canvas);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var arr = createBinaryArray(canvas);
      drawPath(canvas, arr, start, end);
    }).catch(function (img) {
      console.log(img);
    })
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
      img.crossOrigin = 'anonymous';
      img.src = url;
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

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(start.x, start.y, 8, 8);
    ctx.fillRect(end.x, end.y, 8, 8);

    for (var i = 0; i < path.length; i += 9) {
      ctx.fillRect(path[i].y, path[i].x, 4, 4);
    }

  }

  
  function slideToLeft() {
    if(vm.activeSide !== 0) {
      vm.mapSlides[vm.activeSide].classList.remove('map__item_active');
      vm.activeSide -= 1;
      vm.mapSlides[vm.activeSide].classList.add('map__item_active');
    }
  }
  
  function slideToRight() {
    if((vm.mapSlides.length - 1) !== vm.activeSide) {
      vm.mapSlides[vm.activeSide].classList.remove('map__item_active');
      vm.activeSide += 1;
      vm.mapSlides[vm.activeSide].classList.add('map__item_active');
    }
  }
  
  function zoomIn() {
    var canvas = document.querySelector("canvas");
    var tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = canvas.width;
    tmpCanvas.height = canvas.height;

    var ctx = canvas.getContext("2d");

    vm.initialImageWidth = vm.initialImageWidth / 2;
    vm.newImageHeight =  vm.imageHeight / vm.imageWidth * vm.initialImageWidth;

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    tmpCanvas.getContext("2d").putImageData(imgData, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tmpCanvas, 0, 0, vm.initialImageWidth, vm.newImageHeight);

  }

  function zoomOut() {
    var canvas = document.querySelector("canvas");
    var tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = canvas.width;
    tmpCanvas.height = canvas.height;

    var ctx = canvas.getContext("2d");

    vm.initialImageWidth = vm.initialImageWidth * 2;
    vm.newImageHeight =  vm.imageHeight / vm.imageWidth * vm.initialImageWidth;

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    tmpCanvas.getContext("2d").putImageData(imgData, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tmpCanvas, 0, 0, vm.initialImageWidth, vm.newImageHeight);

  }



}
