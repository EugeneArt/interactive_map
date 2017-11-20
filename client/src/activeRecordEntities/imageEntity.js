angular
  .module('app')
  .factory('imageEntity', imageEntity);

function imageEntity($cacheFactory, $q, $injector, ActiveRecord, API_ENDPOINT) {

  var prototype = {
    $urlRoot: API_ENDPOINT + 'imagelist/',
    $cache: $cacheFactory('imagelist'),
    $constructor: function roomEntity(properties) {
      this.$initialize.apply(this, arguments)
    }
  };

  var methods = {
  };

  return ActiveRecord.extend(prototype, methods);
}