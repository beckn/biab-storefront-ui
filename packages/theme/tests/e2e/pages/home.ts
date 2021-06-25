import Base from './base';
import Header from './components/header';
import LocationModal from './components/location-modal';
import locationSidebar from './components/location-sidebar';

class Home extends Base {
  get header() {
    return Header;
  }

  get locationModal() {
    return LocationModal;
  }

  get locationSideBar() {
    return locationSidebar;
  }

  visit(): Cypress.Chainable {
    return cy.visit('/');
  }
}

export default new Home();
