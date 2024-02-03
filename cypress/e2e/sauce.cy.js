describe('Регистрация пользователя', () => {

  it('Должна успешно зарегистрировать нового пользователя', () => {
    cy.visit('https://demowebshop.tricentis.com/register');

    // Ввод данных для регистрации
    cy.get('#gender-male').check();
    cy.get('#FirstName').type('Роман');
    cy.get('#LastName').type('Колотов');
    cy.get('#Email').type('testuser@example.com');
    cy.get('#Password').type('password');
    cy.get('#ConfirmPassword').type('password');

    // Нажатие на кнопку регистрации
    cy.get('#register-button').click();

    // Проверка успешной регистрации
    cy.url().should('include', 'https://demowebshop.tricentis.com/register');
  });

  it('Должен успешно войти в систему с правильными учетными данными', () => {
    cy.visit('https://demowebshop.tricentis.com/login');

   
    cy.get('#Email').type('kolotovr@gmail.com');
    cy.get('#Password').type('112345');
    cy.get('input[value="Log in"]').click();
    cy.url().should('include', 'https://demowebshop.tricentis.com');
  });

  it('Должен успешно выполнять поиск товара', () => {
    cy.visit('https://demowebshop.tricentis.com/');
    cy.get('#small-searchterms').type('Laptop');
    cy.get('.search-box-button').click();
    cy.get('.product-item').should('have.length.greaterThan', 0);
  });

  it('Должен успешно добавить товар в корзину', () => {
    cy.visit('https://demowebshop.tricentis.com/')
    cy.get(".top-menu > li").first().click()
    cy.get("[value='Add to cart']").first().click()
    cy.get(".bar-notification").should("have.css", "display", "block")
    cy.get(".bar-notification > p").should("have.text", "The product has been added to your shopping cart")
  });

  it('Должен успешно оформить заказ', () => {
    it('Должен успешно добавить подарочную карту в корзину', () => {
      cy.visit('https://demowebshop.tricentis.com/25-virtual-gift-card');
      cy.get('#giftcard_RecipientName').type('Имя Получателя');
      cy.get('#giftcard_RecipientEmail').type('recipient@example.com');
      cy.get('#giftcard_Message').type('Поздравляю с праздником!');
      cy.get('#add-to-cart-button-25').click();
      cy.get('.ico-cart').click();
      cy.get('.cart').should('contain', 'Shopping cart');
      cy.get('.product-unit-price').should('contain', 'Virtual Gift Card');
      cy.get('.cart-total-right').should('contain', '$25.00'); // Проверьте актуальную цену
    });
  });
  it('Должен успешно обновить информацию пользователя', () => {
    cy.visit('https://demowebshop.tricentis.com/login');
    cy.get('#Email').type('kolotovr@gmail.com');
    cy.get('#Password').type('112345');
    cy.get('input[value="Log in"]').click();
    cy.get('.account:first').click();
    cy.get('a[href="/customer/info"]:first').click();
    cy.get('#FirstName').clear().type('Новое Имя');
    cy.get('#LastName').clear().type('Новая Фамилия');
    cy.get('input[value="Save"]').click();
    cy.url().should('include', 'https://demowebshop.tricentis.com/customer/info');
  });
});
