import uirouter from 'angular-ui-router';
import 'angular-material';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import './components/carousel/carousel.module';
import './services/flickr/flickr.module';
import './views/home/home.module';
import './index.scss';

angular
  .module('tgh', [
    uirouter,
    'tgh.view.home',
    'tgh.service.flickr',
    'tgh.component.carousel',
    'ngMaterial',
    'ngSanitize'
  ]).config(($urlRouterProvider, $locationProvider, $mdIconProvider, $mdThemingProvider) => {
    'ngInject';

    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/home');

    $mdIconProvider
      .defaultIconSet('./assets/svg/avatars.svg', 128);

    $mdThemingProvider.theme('altTheme')
      .primaryPalette('grey')
      .accentPalette('red');

    $mdThemingProvider.setDefaultTheme('altTheme');
  })
  .run(function($rootScope, $log, $location, $mdToast) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

      if (error) {
        event.preventDefault();
        $log.error(error);
        let toast = $mdToast.simple()
            .content('Application Error')
            .action('OK')
            .highlightAction(true)
            .hideDelay(0)
            .theme('error-toast')
            .position('top right');

        $mdToast.show(toast);
      }
    });
  });
