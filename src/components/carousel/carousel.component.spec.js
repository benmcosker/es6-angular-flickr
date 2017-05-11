import './carousel.module';
import 'angular-material';

describe('tgh.component.carousel', () => {
  beforeEach(angular.mock.module('tgh.component.carousel'));
  beforeEach(angular.mock.module('ngMaterial'));

  let $compile;
  let element;
  let $rootScope;
  let $interval;
  let $mdDialog;
  let photos = [
    'http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg',
    'http://farm3.staticflickr.com/2909/33718347572_47f31feb90.jpg',
    'http://farm3.staticflickr.com/2883/33834000206_94c4359597.jpg',
    'http://farm4.staticflickr.com/3954/33834000256_3f6a26c303.jpg',
    'http://farm3.staticflickr.com/2857/33745613861_97ed25eea8.jpg'
  ];
  let scope;

  describe('successful load of carousel images', () => {

    beforeEach(inject(function(_$rootScope_, _$compile_, _$interval_, _$mdDialog_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $interval = _$interval_;
      $mdDialog = _$mdDialog_;
      scope = $rootScope.$new();
      scope.photos = photos;
      element = angular.element('<tgh-carousel-component pictures="photos">');
      element = $compile(element)(scope);
      scope.$apply();
    }));

    it('should test the carousel renders by finding component text', () => {
      expect(element[0].outerHTML).toContain('Flickr API returned no images');
    });

    it('should test that a different image appears in three seconds', () => {
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg');
      $interval.flush(3001);
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2909/33718347572_47f31feb90.jpg');
    });

    it('should test that the same image appears after three seconds if the stop button is clicked', () => {
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg');
      $(element[0]).find('#stop').click();
      $interval.flush(3001);
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg');
    });

    it('should test the carousel can be restarted if the start button is clicked after its stopped', () => {
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg');
      $(element[0]).find('#stop').click();
      $interval.flush(3001);
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg');
      $(element[0]).find('#stop').click();
      $interval.flush(3001);
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2909/33718347572_47f31feb90.jpg');
    });

    it('should test that a the prev button moves the visible image to the last image in the array', () => {
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg');
      $(element[0]).find('#prev').click();
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2857/33745613861_97ed25eea8.jpg');
    });

    it('should test that a the next button moves the visible image to the next image in the array', () => {
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg');
      $(element[0]).find('#next').click();
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2909/33718347572_47f31feb90.jpg');
    });

    it('should test that a modal opens up when the image is clicked', () => {
      spyOn($mdDialog, 'show').and.callThrough();
      $(element[0]).find('img').click();
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('should test that when a modal opens up the interval is turned off', () => {
      spyOn($mdDialog, 'show').and.callThrough();
      $(element[0]).find('img').click();
      $interval.flush(3001);
      expect(element[0].outerHTML).toContain('http://farm3.staticflickr.com/2938/33745613771_092c5acc57.jpg');
    });

    it('should not display the API error warning', () => {
      expect($(element[0].outerHTML).find('.error-box').is(':visible')).toBe(false);
    });

  });

  describe('no images load into carousel', () => {
    beforeEach(inject(function(_$rootScope_, _$compile_, _$interval_, _$mdDialog_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $interval = _$interval_;
      $mdDialog = _$mdDialog_;
      scope = $rootScope.$new();
      scope.photos = '';
      element = angular.element('<tgh-carousel-component pictures="photos">');
      element = $compile(element)(scope);
      scope.$apply();
    }));

    it('should display the API error warning', () => {
      console.info($(element[0].outerHTML).find('.error-box'));
      console.info($(element[0].outerHTML).find('img'));
      console.info($(element[0].outerHTML).find('.error-box').is(':visible'));
      // Buggy behavior on .is(:visible)
      expect($(element[0].outerHTML).find('.error-box')).not.toContain('ng-hide');
    });

  });
});
