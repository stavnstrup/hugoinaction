import Fuse from 'fuse.js'

let index = null;
const MAX_SEARCH_RESULTS = 5;
export default {
  async init() {
    try {
      const response = await window.fetch(BASE_URL + "/index.json");
      if (!response.ok) {
        this.removeSearch();
        return;
      }
      let data = await response.json();
      index = new Fuse(data, {
        keys: [{
          name: 'title',
          weight: 20
        }, {
          name: 'tag',
          weight: 5
        }, {
          name: 'content'
        }]
      });

      document.addEventListener("keyup", this.onKeyUp);
      document.addEventListener("input", this.showResults);
      document.addEventListener("focusin", this.showResults);
      document.addEventListener("focusout", this.onLoseFocus);
    } catch (e) {
      this.removeSearch();
    }
  },

  showResults(event) {
    const searchBox = document.querySelector("#search input");
    if (event.target !== searchBox) {
      return;
    }
    const result = document.querySelector("#search div");
    result.style.display = "block";
    if (searchBox.value.length > 0) {
      const results = index.search(searchBox.value);
      result.innerHTML = results
        .slice(0, MAX_SEARCH_RESULTS)
        .map(x => `<a href="${x.item.url}">${x.item.title}</a>`)
        .join("");
    } else {
      result.innerHTML = '';
    }
  },

  onKeyUp(event) {
    const searchBox = document.querySelector("#search input");
    if (event.target !== searchBox) {
      return;
    }
    if (event.key === "Enter") {
      const results = index.search(searchBox.value);
      if (results.length > 0) {
        window.location = results[0].item.url;
      }
    }
  },

  onLoseFocus(event) {
    const searchBox = document.querySelector("#search input");
    if (event.target !== searchBox) {
      return;
    }
    const result = document.querySelector("#search div");
    if (!event.relatedTarget.matches("#search div *")) { result.style.display = "none"; }
  },

  removeSearch() {
    document.querySelector("#search")?.remove();
  }
}
