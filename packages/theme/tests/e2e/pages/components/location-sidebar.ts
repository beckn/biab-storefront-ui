class LocationSidebar {
  get sideBarInput(): Cypress.Chainable {
    return cy.get('[data-e2e="app-location-sidebar-input"]');
  }
  get sideBar(): Cypress.Chainable {
    return cy.get('[data-e2e="app-location-sidebar"]');
  }
  get sideBarFirstOption(): Cypress.Chainable {
    return cy.get('[data-e2e="app-location-sidebar-input-options"]').first();
  }
}
export default new LocationSidebar();
