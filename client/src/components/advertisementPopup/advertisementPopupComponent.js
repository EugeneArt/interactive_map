angular
  .module('app')
  .component('advertisementPopupComponent', {
    templateUrl: '/src/components/advertisementPopup/advertisementPopupView.html',
    bindings: {
      video: '<'
    },
    controller: advertisementPopupController
  })
;

function advertisementPopupController() {

  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
  }

}
