describe("Toggle tussen dark en light theme", () => {
  it("Laat de achtergrond van kleur veranderen", () => {
    cy.visit('http://localhost:5173');
    cy.wait(500);

    // Get the initial background color
    let initialColor;
    cy.get("[data-cy=navbar]").should('have.css', 'background-color').then((color) => {
      initialColor = color;
    });

    // Click on the theme toggle button
    cy.get("[data-cy=toggle_theme]").click();

    // Get the background color after toggling
    cy.get("[data-cy=navbar]").should('have.css', 'background-color').should('not.eq', initialColor);
  });
});


