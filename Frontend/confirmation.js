class ConfirmOrder {
    constructor() {
        this.checkLocal();
    }
    checkLocal() {
        if (localStorage.getItem("order") != null) {
            this.contactProducts = JSON.parse(localStorage.getItem("order"));
            this.cartContent = this.contactProducts.products;
            document.querySelector("#orderID").innerHTML = 'Numéro de votre commande: ' + this.contactProducts.orderId;
            this.updateTotal('Montant de votre commande: ');
            document.querySelector("#orderLastName").innerHTML = 'Nom: ' + this.contactProducts.contact.lastName;
            document.querySelector("#orderFirstName").innerHTML = 'Prénom: ' + this.contactProducts.contact.firstName;
            document.querySelector("#orderEmail").innerHTML = 'Email: ' + this.contactProducts.contact.email;
            document.querySelector("#orderAddress").innerHTML = 'Adresse: ' + this.contactProducts.contact.address;
            document.querySelector("#orderCity").innerHTML = 'Ville: ' + this.contactProducts.contact.city;
        }
    }

    updateTotal(text) {
        const getPTotal = document.querySelector('.total');
        let cartTotal = 0;
        this.cartContent.forEach(cartItem => {
            cartTotal += parseInt(cartItem.price);
        })
        getPTotal.textContent = text + cartTotal / 100 + '€';
    }
}

new ConfirmOrder();