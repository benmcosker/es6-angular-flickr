import './flickr.module';

describe('tgh.services.flickr', () => {
  /* eslint-disable no-unused-vars*/
  let $httpBackend;
  let FlickrService;
  let $log;
  let $q;
  /* eslint-enable no-unused-vars*/

  beforeEach(function() {
    angular.mock.module('tgh.service.flickr');
  });

  beforeEach(inject(function(_$httpBackend_, _FlickrService_, _$log_, _$q_) {
    $httpBackend = _$httpBackend_;
    FlickrService = _FlickrService_;
    $log = _$log_;
    $q = _$q_;
  }));

  afterEach(function() {
    // FlickrService = null;
  });

  it('should test that flickrService service exists', () => {
    expect(FlickrService).toBeDefined();
  });

  it('should test that flickrService.getPictures service exists', () => {
    expect(FlickrService.getPictures).toBeDefined();
  });

  it('should test that flickrService.madeUpFunction service does not exist', () => {
    expect(FlickrService.madeUpFunction).not.toBeDefined();
  });

  it('should test that flickrService.getPictures returns a promise', () => {
    let returnObj = FlickrService.getPictures();
    let deferred = $q.defer();
    let promise = deferred.promise;

    FlickrService.getPictures();
    expect(returnObj).toEqual(promise);
  });

  describe('describe error logging', () => {

    it('should have provisions for api error return', () => {
      // let returnObj = FlickrService.getPictures();
      // let deferred = $q.defer();
      // let promise = deferred.promise;
      //
      // $httpBackend.when('GET', 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos')
      //     .respond(500, 'error on api');
      //
      // FlickrService.getPictures();
      // $httpBackend.flush();
      // expect(returnObj).not.toEqual(promise);
    });
  });

});
