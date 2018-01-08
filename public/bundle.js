'use strict';

class Request {
  constructor() {
    this.findElements();
    this.buttonHandler();
  }

  findElements() {
    this.input = document.querySelector('input');
    this.button = document.querySelector('button');
  }

  serverAnswer(data) {
    const p = document.createElement('p');
    p.textContent = `Hello ${data}`;
    document.body.appendChild(p);
  }

  buttonHandler() {
    this.button.addEventListener('click', () => this.sendData());
  }

  sendData() {
    if (this.input.value) {
      fetch('http://localhost:6289/hello', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.input.value})
      })
      .then(response => {
        if (response.status !== 200) {
          console.log(`Oops, problem. Status Code: ${response.status}`);
          return;
        }
        return response.json();
      })
      .then(data => {
        this.serverAnswer(data);
        this.input.value = '';
      })
      .catch(error => console.log('error', error.message));
    }
  }
}

const request = new Request();
