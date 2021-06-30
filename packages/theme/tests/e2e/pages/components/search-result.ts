class SearchResult {
  get getBeforeResult(): Cypress.Chainable {
    return cy.get('[data-v-f2383d48]');
  }

  get getTotalSearchResult(): Cypress.Chainable {
    return cy.get('[data-e2e="total-result"]');
  }
}
export default new SearchResult();
