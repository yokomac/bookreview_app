describe('入力フォームのブラウザテスト', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // アプリのURL
  });

  it('不備がある場合はエラーメッセージが表示される', () => {
    
    // 入力フォームに不備のある値を入力する
    cy.get('[data-testid="email-input"]').type('invalid-email');
    
    // 送信ボタンをクリック
    cy.get('[data-testid="submit-button"]').click();
    
    // エラーメッセージが表示されていることを確認
    cy.get('[data-testid="error-message"]').should('be.visible');
  });

  it('不備がなければエラーメッセージを表示しない', () => {
    // 入力フォームに正しい値を入力する
    cy.get('[data-testid="email-input"]').type('valid-email@example.com');
    
    // 送信ボタンをクリック
    cy.get('[data-testid="submit-button"]').click();
    
    // エラーメッセージが表示されていないことを確認
    cy.get('[data-testid="error-message"]').should('not.exist');
  });
});
