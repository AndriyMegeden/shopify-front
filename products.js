const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  item.addEventListener("click", () => {
    const content = item.querySelector(".accordion-content");

    const icon = item.querySelector(".accordion img");
    const accordion = item.querySelector(".accordion");

    if (content && icon && accordion) {
      content.classList.toggle("active");
      icon.classList.toggle("rotate");

      if (content.classList.contains("active")) {
        icon.src = "images/minus.svg";

        accordion.style.backgroundColor = "#d7ecec";
        accordion.style.borderBottomLeftRadius = "0px";
        accordion.style.borderBottomRightRadius = "0px";
      } else {
        icon.src = "images/plus.svg";

        accordion.style.backgroundColor = "#f7f8fb";
        accordion.style.borderBottomLeftRadius = "12px";
        accordion.style.borderBottomRightRadius = "12px";
      }
    }
  });
});

const query = `
{
  products(first: 10) {
    edges {
      node {
        title
        description
        variants(first: 1) {
          edges {
            node {                     
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 2) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}
`;

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://tsodykteststore.myshopify.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "7e174585a317d187255660745da44cc7",
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();
    console.log("Отримані дані:", data);

    if (data?.data?.products?.edges?.length) {
      renderProducts(data.data.products.edges);
    } else {
      console.warn("Продуктів немає або API повернув порожній список.");
    }
  } catch (error) {
    console.error("Помилка отримання продуктів:", error);
  }
}

fetchProducts();

function renderProducts(products) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  products.forEach(({ node }) => {
    const images = node.images.edges;
    const imageUrl = images.length > 0 ? images[0].node.url : "images/cleaner.svg";
    const hoverImageUrl = images.length > 1 ? images[1].node.url : imageUrl; // Якщо є друге зображення

    const oldPrice = node.variants.edges[0]?.node.compareAtPrice?.amount || "";
    const newPrice = node.variants.edges[0]?.node.price.amount;
    const currency = node.variants.edges[0]?.node.price.currencyCode || "";

    const cardHTML = `
      <div class="card">
        <img class="product-image" 
             src="${imageUrl}" 
             alt="${images[0].node.altText || node.title}" 
             data-default="${imageUrl}" 
             data-hover="${hoverImageUrl}" />
        <span class="name">${node.title}</span>
        <span class="description">${
          node.description || "No description available"
        }</span>
        <div class="price">
          <span class="old">${oldPrice ? `${oldPrice} ${currency}` : ""}</span>
          <span class="new">${newPrice} ${currency}</span>
        </div>
      </div>
    `;

    cardsContainer.innerHTML += cardHTML;
  });

  // Додаємо ховер ефект після рендеру
  document.querySelectorAll(".product-image").forEach((img) => {
    img.addEventListener("mouseover", () => {
      img.src = img.dataset.hover; // Міняємо на другу картинку
    });

    img.addEventListener("mouseout", () => {
      img.src = img.dataset.default; // Повертаємо першу картинку
    });
  });
}


