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

  function onInit() {

  }
  
  function getPath() {
    console.log(vm.selectedRoom);
    var params = {
      params: {
        floor: FLOOR_ID,
        room: vm.selectedRoom.originalObject.id
      }
    };
    var path = findPathEntity.fetchAll(params);
    console.log(path);
  }
  
  


}
