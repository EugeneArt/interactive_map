angular
  .module('app')
  .component('headerComponent', {
    templateUrl: '/src/components/header/headerView.html',
    bindings: {},
    controller: headerComponentController
  })
;

function headerComponentController($timeout,dateFilter) {

  var vm = this;
  vm.$onInit = onInit;
  vm.updateTime = updateTime;

  function onInit() {
    vm.updateTime()
  }
  
  function updateTime() {
    $timeout(function(){
        vm.clock = (dateFilter(new Date(), 'HH:mm:ss'));
        vm.day = (dateFilter(new Date(), 'EEEE, d LLLL'));
        vm.updateTime();
    },1000);
  }

}