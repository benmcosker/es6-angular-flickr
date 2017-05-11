import './index';
import uirouter from 'angular-ui-router';

describe('tgh', () => {

  /* eslint-disable no-unused-vars*/
  let $httpBackend;
  let FlickrService;
  let $location;
  let $log;
  let $mdToast;
  let $rootScope;
  let $urlRouterProvider;
  let $locationProvider;
  /* eslint-enable no-unused-vars*/

  beforeEach(function () {
    angular.mock.module(function(_$locationProvider_) {
      $locationProvider = _$locationProvider_;
    });
    angular.mock.module('tgh', uirouter, 'tgh.view.home', 'tgh.service.flickr', 'tgh.component.carousel', 'ngMaterial', 'ngSanitize',
        function ($provide) {
          $provide.value('$urlRouterProvider', {
            otherwise: jasmine.createSpy()
          });
        });

    inject(function (_$location_, _$log_, _$mdToast_, _$rootScope_, _$httpBackend_, _FlickrService_) {
      $location = _$location_;
      $log = _$log_;
      $mdToast = _$mdToast_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      FlickrService = _FlickrService_;
    });
  });

  it('should test /home is navigated to on if routeChangeError', () => {
    $rootScope.$digest();
    expect($location.$$path).toBe('/home');
  });

  it('should invoke toast on routeChangeError', () => {
    spyOn($log, 'error');
    spyOn($mdToast, 'show');
    $httpBackend.expect('GET', 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos').respond(500, 'error on api');
    FlickrService.getPictures();
    // $httpBackend.flush();
    $rootScope.$emit('$routeChangeError', null);
    $rootScope.$apply();

    // expect($log.error).toHaveBeenCalled();
    // expect($mdToast.simple).toHaveBeenCalled();
  });

});
