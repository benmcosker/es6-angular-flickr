import CarouselHTML from './carousel.component.html';
import ModalHTML from './carousel.modal.template.html';
import './carousel.component.scss';

export default class CarouselDirective {

  constructor() {
    'ngInject';

    this.template = CarouselHTML;
    this.restrict = 'E';
    this.scope = {
      pictures: '='
    };
  }

  link(scope) {
    let carousel;
    let counter = 0;
    let toggle = true;
    const imageNumberCount = scope.pictures.length;

    scope.play = 'pause';

    init();

    function checkCarouselAdvance() {
      counter >= imageNumberCount ? counter = 0 : counter;
      counter < 0 ? counter = imageNumberCount - 1 : counter;
    }

    function init() {
      scope.carouselImages = [];
      scope.carouselImages = scope.pictures;
      loadImage(0);
      carousel = scope.interval(next, 3000);
    }

    function loadImage(index) {
      scope.loadedImage = scope.carouselImages[index];
    }

    function next() {
      counter += 1;
      checkCarouselAdvance();
      loadImage(counter);
    }

    function prev() {
      counter -= 1;
      checkCarouselAdvance();
      loadImage(counter);
    }

    function toggleCarouselButton() {
      scope.play = toggle ? 'pause' : 'play_arrow';
    }

    scope.cancel = function () {
      scope.$mdDialog.cancel();
    };

    scope.next = function () {
      next();
    };

    scope.prev = function () {
      prev();
    };

    scope.showModal = function () {
      scope.interval.cancel(carousel);
      this.$mdDialog.show({
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        scope: scope,
        preserveScope: true,
        template: ModalHTML
      })
      .then(function() {
        carousel = scope.interval(next, 3000);
      }, function() {
        carousel = scope.interval(next, 3000);
      });
    };

    scope.toggleCarousel = function () {
      toggle ? scope.interval.cancel(carousel) : carousel = scope.interval(next, 3000);
      toggle = !toggle;
      toggleCarouselButton();
    };
  }

  controller($scope, $interval, $mdDialog) {
    $scope.interval = $interval;
    $scope.$mdDialog = $mdDialog;
  }
}
