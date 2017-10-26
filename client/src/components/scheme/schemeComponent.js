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

function schemeComponentController(schemeEntity) {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
      vm.sheme = new schemeEntity();
      vm.sheme.name = "test2";
      vm.sheme.graph = [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]];
      vm.sheme.map = {
            name: "test2",
            start_coordinate: {
                latitude: 122,
                longitude: 10
            },
           image: 72
      };


      vm.sheme.$save();

  }



}
