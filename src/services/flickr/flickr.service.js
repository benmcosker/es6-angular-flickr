export default class FlickrService {
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
  }

  getPictures() {
    let url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos';
    let config = {
      params: {
        /* eslint-disable camelcase*/
        api_key: 'bc384b6a88d592a2d10b80cdf6254282',
        user_id: '15187146@N07',
        /* eslint-enable camelcase*/
        format: 'json',
        dataType: 'json',
        nojsoncallback: 1
      }
    };

    return this.$http({
      url: url,
      params: config.params,
      method: 'GET',
      transformResponse: [function (data) {
        let image = angular.fromJson(data).photos.photo;
        let imgUrls = [];

        for (const key in image) {
          imgUrls.push(`http://farm${image[key].farm}.staticflickr.com/${image[key].server}/${image[key].id}_${image[key].secret}.jpg`);
        }

        return imgUrls;
      }].concat(this.$http.defaults.transformResponse)
    }).catch(() => {
      // no op;
    });
  }
}
