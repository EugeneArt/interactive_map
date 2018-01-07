angular
    .module('app')
    .component('appComponent', {
      templateUrl: '/src/components/app/appView.html',
      bindings: {
        video: '<'
      },
      controller: appComponentController
    })
;

function appComponentController(ngDialog, $interval) {

  var vm = this;
  vm.$onInit = onInit;
  vm.onFocus = onFocus;
  vm.showAdevertisement = showAdevertisement;
  vm.startTimer = startTimer;

  function onInit() {
    // vm.startTimer();
  }

  function startTimer() {
    var counter = 0;
    vm.stopTimer = $interval(function () {
      if(counter > 5) {
        vm.showAdevertisement();
        $interval.cancel(vm.stopTimer);
      }
      console.log(counter);
      counter ++;
    }, 1000);
  }

  function onFocus() {
    console.log('clear timer');
    $interval.cancel(vm.stopTimer);
    vm.startTimer();
  }

  function showAdevertisement() {
    ngDialog.open({
      template: '<advertisement-popup-component' +
      ' video="ngDialogData.video">' +
      '</advertisement-popup-component>',
      plain: true,
      className: 'ngdialog-theme-default',
      data: {
        video: vm.video[0].video
      }
    });
  }
}
