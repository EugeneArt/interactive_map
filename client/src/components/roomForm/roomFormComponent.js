angular
  .module('app')
  .component('roomFormComponent', {
    templateUrl: '/src/components/roomForm/roomFormView.html',
    bindings: {
        room: '<'
    },
    controller: roomFormComponentController
  });

function roomFormComponentController() {

  var vm = this;
  vm.$onInit = onInit;


  function onInit() {
    vm.room.coordinate = {};
  }

}