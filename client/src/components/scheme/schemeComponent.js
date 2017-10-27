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
      var scheme = angular.element(document.querySelector("#scheme"));
      var schemeArea = angular.element(document.querySelector("#scheme-area"));

      scheme.css('background-image',  'url(' + image + ')');
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
        schemeArea.append(tr);
      }
  }



}
