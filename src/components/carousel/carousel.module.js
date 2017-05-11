import CarouselComponent from './carousel.component';

export default angular
    .module('tgh.component.carousel', [])
    .directive('tghCarouselComponent', ['$interval', '$mdDialog', ($interval, $mdDialog) => new CarouselComponent($interval, $mdDialog)]);
