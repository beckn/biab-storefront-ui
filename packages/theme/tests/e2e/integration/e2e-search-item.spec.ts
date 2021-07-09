import page from '../pages/factory';

context('Search item', () => {
  beforeEach(()=>{
    page.home.visit();
    cy.then(()=>{
      window.localStorage.setItem('__search__', '');
    });
  });
  it(['e2e', 'happypath'], 'Should get search item', ()=>{
    page.home.visit();
    // page.home.header.searchBox.should('exist');
    // page.home.header.searchInputField.should('exist');
    // page.home.header.searchInputField.should('not.be.focused');
    // page.home.header.searchInputField.invoke('val').should('eq', '');
    // click and type input
    // page.home.header.searchInputField.click();
    // page.home.searchResult.getBeforeResult.should('exist');
    // page.home.header.searchInputField.type('coffee{enter}');
  });
});
