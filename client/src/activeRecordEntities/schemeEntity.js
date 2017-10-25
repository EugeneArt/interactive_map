angular
  .module('app')
  .factory('albumsEntity', albumsEntity);

function albumsEntity($cacheFactory, $q, $injector, ActiveRecord, API_ENDPOINT) {

  var prototype = {
    $urlRoot: API_ENDPOINT + 'albums',
    $cache: $cacheFactory('albums'),
    $constructor: function categoryEntity(properties) {
      this.$initialize.apply(this, arguments)
    }
  };

  var methods = {
  };

  return ActiveRecord.extend(prototype, methods);
}