import { matchTemplate } from "./util"

let cart = [];
let products = {};

export default {
  async init() {
    document.addEventListener("click", this.handleClick.bind(this));
    await this.productInfo();
    window.addEventListener('storage', this.updateCart.bind(this));
    this.updateCart();
  },

  handleClick(event) {
    if (event.target.classList.contains("addToCart")) {
      event.preventDefault();
      this.addToCart(event.target.form);
    } else if (event.target.matches(".cart .delete")) {
      this.onDelete(event);
    }
  },

  addToCart(form) {
    const data = new FormData(form);
    const name = data.get("name");
    const color = data.get("color");
    if (!cart.find(x => x.name === name && x.color === color)) {
      cart.push({ name, color });
    }
    this.render();
    this.save();
  },

  updateCart() {
    const disk = JSON.parse(window.localStorage.getItem("cart") || "[]");
    cart= Array.isArray(disk) ? disk : [];
    this.render();
  },

  async productInfo() {
    const response = await window.fetch(BASE_URL + "/store/index.json");
    if (response.ok) {
      products = await response.json();
    }
    this.render();
  },

  save() {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  },

  onDelete: function (e) {
    cart.splice(cart.findIndex(x =>
      x.name == e.currentTarget.dataset.name && x.color === e.currentTarget.dataset.color
    ), 1);
    this.render();
    this.save();
  },

  render() {
    let badge = document.querySelector(".cart .badge");
    let itemList = document.querySelector(".cart > div");
    let template = document.querySelector("#cart-item")?.innerHTML;
    if (badge) {
      badge.innerText = cart.length;
    }
    if (!products || !Object.keys(products).length) {
      return;
    }
    if (cart.length === 0) {
      document.querySelector(".cart")?.classList.remove("visible");
    } else {
      document.querySelector(".cart")?.classList.add("visible");
    }

    const info = cart.map(x => ({
      ...x, price: parseFloat(products[x.name].Price.substr(1)),
      cover: products[x.name].Cover
    }));

    if (info.length > 0 && template && itemList) {
      itemList.innerHTML = info
        .map(x => matchTemplate(template, Object.entries(x))).join("\n");
    }
  }
}
