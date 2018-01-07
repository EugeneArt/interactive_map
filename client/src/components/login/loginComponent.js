angular
  .module('app')
  .component('loginComponent', {
    templateUrl: '/src/components/login/loginView.html',
    bindings: {},
    controller: loginComponentController
  })
;

function loginComponentController($auth, $state) {

  var vm = this;
  vm.$onInit = onInit;
  vm.handleLoginBtnClick = handleLoginBtnClick;

  function onInit() {
    vm.user = {};
  }

  function handleLoginBtnClick() {
      $auth.login(vm.user)
        .then(function(resp) {
          // handle success response
          $state.go('admin.sсhemeList', {}, {reload: true});

        })
        .catch(function(resp) {
          // handle error response
        });
  }

}