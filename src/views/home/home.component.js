export default class HomeComponentController {
  constructor(pictures) {
    'ngInject';
    this.pictures = pictures ? pictures.data : [];
  }
}
