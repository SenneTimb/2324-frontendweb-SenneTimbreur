describe('Voeg ouder toe', () => {
  it("zou een ouder moeten toevoegen", () => {
    cy.visit('http://localhost:5173');
    cy.get("[data-cy=log_in]").click()
    cy.wait(500)
    cy.visit("http://localhost:5173/ouders/form");
    cy.get("[data-cy=ouder_voornaam_input]").type("Steffen");
    cy.get("[data-cy=ouder_naam_input]").type("Vervynck");
    cy.get("[data-cy=ouder_telefoonnummer_input]").type("04/56.43.45.75")
    cy.get("[data-cy=voeg_ouder_toe]").click()
    cy.visit("http://localhost:5173/ouders")
    cy.wait(500)
    cy.get("[data-cy=ouder_voornaam]").contains("Steffen");
    cy.get("[data-cy=ouder_naam]").contains("Vervynck");
    cy.get("[data-cy=ouder_telefoonnummer]").contains("04/56.43.45.75");
    cy.get("[data-cy=ouder]").should("have.length", 5);
    });

  it("zou de ouder moeten verwijderen", () => {
    cy.visit('http://localhost:5173');
    cy.get("[data-cy=log_in]").click()
    cy.wait(500)
    cy.visit("http://localhost:5173/ouders"); 
    cy.wait(500)
    cy.get("[data-cy=ouder_verwijder_input]").eq(4).click(); 
    cy.get("[data-cy=ouder]").should("have.length", 4); 
  });


  it("zou een foutmelding moeten geven voor telefoonnummer", () => {
    cy.visit('http://localhost:5173');
    cy.get("[data-cy=log_in]").click()
    cy.wait(500)
    cy.visit("http://localhost:5173/ouders/form");
    cy.get("[data-cy=ouder_voornaam_input]").type("Steffen");
    cy.get("[data-cy=ouder_naam_input]").type("Vervynck");
    cy.get("[data-cy=ouder_telefoonnummer_input]").type("04/56.43.45")
    cy.get("[data-cy=voeg_ouder_toe]").click()
    cy.get("[data-cy=label_input_error]").contains("Ongeldig telefoonnummer formaat. Gebruik het formaat 0X/XX.XX.XX.XX");
  });
  
});