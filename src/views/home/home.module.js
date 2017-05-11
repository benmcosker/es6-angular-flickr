/* eslint-disable no-unused-vars*/
import FlickrService from '../../services/flickr/flickr.service';
/* eslint-enablee no-unused-vars*/
import HomeComponentController from './home.component';
import HomeTemplate from './home.component.html';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

export default angular
  .module('tgh.view.home', [
    uirouter,
    ngMaterial
  ])
  .controller('HomeComponentController', HomeComponentController)

  .config(($stateProvider) => {
    $stateProvider.state({
      name: 'home',
      url: '/home',
      template: HomeTemplate,
      controller: HomeComponentController,
      controllerAs: 'vm',
      resolve: {
        pictures: ['FlickrService', function (FlickrService) {
          return FlickrService.getPictures();
        }]
      }
    });
  });
