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
  vm.createGraph = createGraph;
  vm.setCoordinateWall = setCoordinateWall;
  vm.getInitialCoordinate = getInitialCoordinate;
  vm.saveScheme = saveScheme;
  vm.addBuilding = addBuilding;

  vm.model = new schemeEntity();
  vm.model.map = {};
  vm.model.map.start_coordinate = {};
  vm.model.buildings = [];
  vm.scheme = angular.element(document.querySelector("#scheme"));
  vm.scheme.bind('click', setCoordinateWall);
  vm.schemeArea = angular.element(document.querySelector("#scheme-area"));
  vm.showForm = false;
  vm.showBtnSetInitialCoordinate = false;
  vm.isSetBuildingCoordinate = false;
  vm.isSetInitialCoordinate = false;
  vm.model.graph = [];
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
       vm.showBtnSetInitialCoordinate = true;
  }

  function setCoordinateWall(event) {
    if( event.target.localName === 'td' && !vm.isSetInitialCoordinate && !vm.isSetBuildingCoordinate) {
            var cellIndex = event.target.cellIndex;
            var parentTr = event.target.parentElement;
            var rowIndex = parentTr.rowIndex;
            event.target.style.backgroundColor = event.target.style.backgroundColor === ""? "red": "";
            vm.model.graph[rowIndex][cellIndex] = vm.model.graph[rowIndex][cellIndex] === 1? 0: 1;
    }
  }
  
  function getInitialCoordinate() {
      vm.isSetInitialCoordinate = true;
      vm.scheme.bind('click', function (event) {
          if( event.target.localName === 'td' && vm.isSetInitialCoordinate && !vm.isSetBuildingCoordinate) {
            var cellIndex = event.target.cellIndex;
            var parentTr = event.target.parentElement;
            var rowIndex = parentTr.rowIndex;

            if(Object.keys(vm.model.map.start_coordinate).length) {
                vm.model.map.start_coordinate = {};
                var oldInitial = angular.element(document.querySelector(".scheme-terminal__color"));
                oldInitial[0].remove('scheme-terminal__color');
            }

            vm.model.map.start_coordinate.latitude = cellIndex;
            vm.model.map.start_coordinate.longitude = rowIndex;

            event.target.classList.add("initial");
            event.target.classList.add("scheme-terminal","scheme-terminal__color");
            event.target.innerHTML = '<span class="scheme-terminal__dialog">Ваш терминал</span>';
            vm.isSetInitialCoordinate = false;
          }
      });
  }

  function addBuilding() {
      vm.buildings = {};
      vm.model.buildings.push(vm.buildings);

  }

  function saveScheme() {
      vm.model.$save();
      console.log(vm.model.buildings);
  }
  




}
