describe("Leden list", () => {
  it("Inloggen", () => {
    cy.visit('http://localhost:5173');
    cy.get("[data-cy=log_in]").click()
  })

  it("zou alle leden moeten tonen", () => {
    cy.visit('http://localhost:5173');
    cy.get("[data-cy=log_in]").click()
    cy.wait(500)
    cy.visit("http://localhost:5173/leden");
    cy.wait(500)
    cy.get("[data-cy=lid]").should("have.length", 3);

  });
  it("zou trage response melding moeten geven", () => {
    cy.visit('http://localhost:5173');
    cy.get("[data-cy=log_in]").click()
    cy.wait(5000)
    cy.intercept(
      "http://localhost:9000/api/leden",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        }); 
      }
    ).as("slowResponse"); 
    cy.visit("http://localhost:5173/leden"); 
    cy.get("[data-cy=loader]").should("be.visible"); 
    cy.wait("@slowResponse"); 
    cy.get("[data-cy=loader]").should("not.exist");
  });
});
