// Функция для переключения страниц
function showAddReviewPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <h1>Добавить отзыв</h1>
      <form id="reviewForm">
        <input type="text" id="productName" placeholder="Название продукта" required>
        <textarea id="productReview" placeholder="Ваш отзыв" rows="5" required></textarea>
        <button type="submit">Добавить отзыв</button>
      </form>
    `;
  
    document.getElementById('reviewForm').addEventListener('submit', addReview);
  }
  
  function showViewReviewsPage() {
    const content = document.getElementById('content');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
  
    let productListHTML = '<h1>Отзывы о продуктах</h1><ul class="product-list">';
    for (const product in reviews) {
      productListHTML += `
        <li>
          <span onclick="showReviews('${product}')">${product}</span>
        </li>
      `;
    }
    productListHTML += '</ul>';
  
    content.innerHTML = productListHTML || '<h1>Нет отзывов</h1>';
  }
  
  function addReview(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value.trim();
    const productReview = document.getElementById('productReview').value.trim();
  
    if (!productName || !productReview) return alert('Пожалуйста, заполните все поля');
  
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (!reviews[productName]) reviews[productName] = [];
    reviews[productName].push(productReview);
  
    localStorage.setItem('reviews', JSON.stringify(reviews));
    alert('Отзыв добавлен!');
    showViewReviewsPage();
  }
  
  function showReviews(product) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const productReviews = reviews[product] || [];
    const content = document.getElementById('content');
  
    let reviewListHTML = `<h1>Отзывы о ${product}</h1><ul class="review-list">`;
    productReviews.forEach((review, index) => {
      reviewListHTML += `
        <li class="review-item">
          ${review}
          <button onclick="deleteReview('${product}', ${index})">Удалить</button>
        </li>
      `;
    });
    reviewListHTML += '</ul><button onclick="showViewReviewsPage()">Назад</button>';
  
    content.innerHTML = reviewListHTML;
  }
  
  function deleteReview(product, index) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (!reviews[product]) return;
  
    reviews[product].splice(index, 1);
    if (reviews[product].length === 0) {
      delete reviews[product];
    }
  
    localStorage.setItem('reviews', JSON.stringify(reviews));
    showReviews(product);
  }
  