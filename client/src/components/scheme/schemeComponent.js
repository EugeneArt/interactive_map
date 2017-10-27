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
  vm.getCoordinate = getCoordinate;
  vm.getInitialCoordinate = getInitialCoordinate;

  vm.model = new schemeEntity();
  vm.model.start_coordinate = {};
  vm.scheme = angular.element(document.querySelector("#scheme"));
  vm.scheme.bind('click', getCoordinate);
  vm.schemeArea = angular.element(document.querySelector("#scheme-area"));
  vm.showBtnSetInitialCoordinate = false;
  vm.isSetInitialCoordinate = false;
  vm.graph = [];
  vm.uploader = new FileUploader({
    url: API_ENDPOINT + 'imagelist/',
    alias: 'image',
    autoUpload: true,
    headers: {},
    onSuccessItem: function (file, response) {
        vm.createGraph(response.image, response.widthOfImage, response.heightOfImage);
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
        vm.graph[i] = [];
        for(var j = 0; j < width; j++) {
            vm.graph[i][j] = 1;
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

  function getCoordinate(event) {
    if( event.target.localName === 'td' && !vm.isSetInitialCoordinate) {
            var cellIndex = event.target.cellIndex;
            var parentTr = event.target.parentElement;
            var rowIndex = parentTr.rowIndex;
            event.target.style.backgroundColor = event.target.style.backgroundColor === ""? "red": "";
            vm.graph[rowIndex][cellIndex] = vm.graph[rowIndex][cellIndex] === 1? 0: 1;
    }
  }
  
  function getInitialCoordinate() {
      vm.isSetInitialCoordinate = true;
      vm.scheme.bind('click', function (event) {
          if( event.target.localName === 'td' && vm.isSetInitialCoordinate) {
            var cellIndex = event.target.cellIndex;
            var parentTr = event.target.parentElement;
            var rowIndex = parentTr.rowIndex;

            if(Object.keys(vm.model.start_coordinate).length) {
                vm.model.start_coordinate = {};
                var oldInitial = angular.element(document.querySelector(".initial"));
                oldInitial[0].remove('initial');
            }

            vm.model.start_coordinate.latitude = cellIndex;
            vm.model.start_coordinate.longitude = rowIndex;

            event.target.classList.add("initial");
            vm.isSetInitialCoordinate = false;
          }
      });
  }



}
