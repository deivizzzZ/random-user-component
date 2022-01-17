const API_URL = "https://randomuser.me/api/";

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.fetchData();
  }

  fetchData() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        this.data = data.results[0];
        this.render();
      });
  }

  get name() {
    return this.data.name.first + " " + this.data.name.last;
  }

  static get styles() {
    return /* css */ `
    h1, p {
      margin: 0;
    }
    .container {
      min-width: 500px;
      border: 2px solid black;
      display: inline-flex;
    }
    .image-container {
      min-width: 175px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .image-container img {
      border-radius: 50%;
    }
    .details {
      min-width: 200px;
      padding: 10px 5px;
    }
    .email{
      color: purple;
    }
    .country {
      font-weight: bold;
    }
    .male {
      color: hotpink;
    }
    .female {
      color: blue;
    }`;
  }

  connectedCallback() {

  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>${UserCard.styles}</style>
      <div class="container">
        <div class="image-container">
          <img src="${this.data.picture.large}" alt="">
        </div>
        <div class="details">
          <h1 class="name ${this.data.gender}">${this.name}</h1>
          <p class="country">${this.data.location.state + " (" + this.data.location.country + ")"}</p>
          <p>${this.data.location.city}</p>
          <p class="email">${this.data.email}</p>
          <p>${this.data.cell}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("user-card", UserCard);
