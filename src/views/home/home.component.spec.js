import './home.module';

describe('tgh.component.navigation', () => {

  beforeEach(angular.mock.module('tgh.view.home', function ($provide) {
    $provide.service('pictures', function() {
      return { data: ['http://farm3.staticflickr.com/2857/33745613861_97ed25eea8.jpg'] };
    });
  }));

  let $controller;
  let HomeComponentController;
  let $scope = {};
  /* eslint-disable no-unused-vars*/
  let pictures;
  /* eslint-enable no-unused-vars*/

  beforeEach(inject(function(_$controller_, _pictures_) {
    $controller = _$controller_;
    pictures = _pictures_;
    HomeComponentController = $controller('HomeComponentController', { $scope: $scope });
  }));

  it('should test that the controller exists', () => {
    expect(HomeComponentController).toBeDefined();
  });

  it('should test that pictures resolves to a scope value', () => {
    $scope.pictures = pictures ? pictures.data : [];
    expect($scope.pictures).toEqual(['http://farm3.staticflickr.com/2857/33745613861_97ed25eea8.jpg']);
  });

  it('should test that scope.pictures resolves to an empty array if undefined/null', () => {
    pictures = null;
    $scope.pictures = pictures ? pictures.data : [];
    expect($scope.pictures).toEqual([]);
  });

});
