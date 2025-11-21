// Hero section logic (Typewriter effect)
export class Typewriter {
  constructor(element, roles, wait = 3000) {
    this.element = element;
    this.roles = roles;
    this.wait = parseInt(wait, 10);
    this.txt = "";
    this.roleIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    // Current index of role
    const current = this.roleIndex % this.roles.length;
    // Get full text of current role
    const fullTxt = this.roles[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert into element
    this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next role
      this.roleIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

export function initTypewriter(roles) {
  const txtElement = document.querySelector(".txt-type");
  if (txtElement) {
    new Typewriter(txtElement, roles);
  }
}
