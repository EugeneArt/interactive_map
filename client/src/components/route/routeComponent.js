angular
  .module('app')
  .component('routeComponent', {
    templateUrl: '/src/components/route/routeView.html',
    bindings: { },
    controller: routeComponentController
  })
;

function routeComponentController(findPathEntity, FLOOR_ID) {

  var vm = this;
  vm.$onInit = onInit;
  vm.getPath = getPath;
  vm.createGraph = createGraph;

  function onInit() {
    vm.scheme = angular.element(document.querySelector("#scheme"));
    vm.schemeArea = angular.element(document.querySelector("#scheme-area"));
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
      var path = result[0];
      var image = path.image;
      var terminal = result[0].current_floor.terminal.coordinate;
      var endpoint = path.coordinate;


      var graph = new Graph(path.current_floor.graph);

      var start = graph.grid[terminal.longitude][terminal.latitude];
	  var end = graph.grid[endpoint.longitude][endpoint.latitude];

	  var route = astar.search(graph, start, end);
	  console.log(route);

      vm.createGraph(image.image, image.widthOfImage, image.heightOfImage);

    }

    function fail(error) {
      console.log(error);
    }


  }

  function createGraph(image, widthOfImage, heightOfImage) {
      vm.scheme.css('background-image',  'url(' + image + ')');
      var width = Math.ceil(widthOfImage/10);
      var heigth = Math.ceil(heightOfImage/10);

      /*
        create graph table
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
  
  


}
