 /// <reference types="cypress" />
 const meno = Math.random().toString(32).substring(2, 10);
 const vek = Math.floor(Math.random() * 40) + 18;
 const vyplata = Math.floor(Math.random() * 500) + 500;

 describe('example data preview', function (){
  
    it('GET example data', function(){
      cy.log("nahodne meno " + meno)
      cy.log("nahodne vek " + vek)
      cy.log("nahodne vyplata " + vyplata)
      })

    })

 describe('get list of all employes', function (){
  
  it('GET: /employee', function(){
    cy.request({
        method: 'GET',
        url: '/employees',
        failOnStatusCode: false
    })
    .then((response) =>{
        expect(response.status).to.eq(200)
        cy.log(response.body)
        expect(response.body.status).to.equal("success")

        // expect(response.body.status).to.equal('success', 'be.visible')
    })
    })
})

describe('TEST CRUD workflow', function (){
    before(function(){
    })
    
    beforeEach(() =>{
        cy.wait(1000)
    })

    after(() => cy.wait(2000).exec('del .\\cypress\\fixtures\\' + meno + '_response.json', { failOnNonZeroExit: false }))

  it('POST: /create - Vytvorit zamestnanca a zobrazit zadane hodnoty so spravnnym statusom', function(){
    cy.request({
        method: 'POST',
        url: '/create',
        failOnStatusCode: false,
        body: {
            "name": meno,
            "salary": vyplata,
            "age": vek
            }
    })
    .then((response) =>{
        expect(response.status).to.eq(200)
        cy.log(response.body)
        expect(response.body.status).to.equal('success')
        expect(response.body.data.age).to.equal(vek)
        expect(response.body.data.name).to.equal(meno)
        expect(response.body.data.salary).to.equal(vyplata)
        expect(response.body.data.id).to.exist

        cy.writeFile('./cypress/fixtures/'+meno+'_response.json', response.body)

        const userId = (response.body.data.id)
        cy.wrap(userId).as('userIdw');

        // expect(response.body.status).to.equal('success', 'be.visible')
    })
    })


  it('GET: /employee vytiahnut data uzivatela na zaklade id', function(){
    cy.request({
        method: 'GET',
        url: '/employee/' + this.userIdw,
        failOnStatusCode: false
    })
    .then((response) =>{
        expect(response.status).to.eq(200)
        cy.log(response.body)
        // expect(response.body.status).to.equal("success")

        // expect(response.body.status).to.equal('success', 'be.visible')
    })
    })

    it('PUT: /update - Zmenit zamesnanca a zobrazit zadane hodnoty so spravnym status kodom', function(){

        cy.request({
            method: 'PUT',
            url: '/update/'+this.userIdW,
            failOnStatusCode: false,
            body: {
                "salary": vyplataNew
            }
        })
        .then((response) =>{
            expect(response.status).to.eq(200)
            cy.log(response.body)
            // expect(response.body.status).to.equal("success")
    
            // expect(response.body.status).to.equal('success', 'be.visible')
        })
})
})