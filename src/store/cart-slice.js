import { createSlice } from '@reduxjs/toolkit';

// Création du slice pour gérer le panier
const cartSlice = createSlice({
  name: 'cart', // Nom du slice
  initialState: {
    items: [], // Liste des articles dans le panier
    totalQuantity: 0, // Quantité totale d'articles dans le panier
    changed: false // Indicateur de modification du panier
  },
  reducers: {
    // Remplace l'état actuel du panier avec les données provenant d'une source externe (ex : backend)
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity; // Met à jour la quantité totale
      state.items = action.payload.items; // Remplace les articles actuels du panier
    }, 
    // Ajoute un nouvel article ou met à jour la quantité d'un article existant dans le panier
    addItemToCart(state, action) {
      const newItem = action.payload; // Nouvel article envoyé depuis le composant
      const existingItem = state.items.find((item) => item.id === newItem.id); // Recherche si l'article existe déjà

      state.totalQuantity++; // Incrémentation du total d'articles dans le panier
      state.changed = true; // Indique que le panier a été modifié

      if (!existingItem) {
        // Si l'article n'existe pas encore, il est ajouté au panier avec une quantité initiale de 1
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1, // Ajout de la première unité
          totalPrice: newItem.price, // Prix total pour cet article
          name: newItem.title, // Nom de l'article
        });
      } else {
        // Si l'article existe déjà, on incrémente sa quantité et on met à jour son prix total
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    // Retire ou réduit la quantité d'un article dans le panier
    removeItemFromCart(state, action) {
      const id = action.payload; // ID de l'article à retirer
      const existingItem = state.items.find((item) => item.id === id); // Recherche de l'article par ID

      state.totalQuantity--; // Décrémente la quantité totale
      state.changed = true; // Indique que le panier a été modifié

      if (existingItem.quantity === 1) {
        // Si l'article n'a qu'une unité, on le retire complètement du panier
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        // Si plusieurs unités de l'article sont présentes, on réduit simplement la quantité
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// Exportation des actions du slice pour être utilisées ailleurs dans l'application
export const cartActions = cartSlice.actions;

// Exportation du slice pour l'intégrer au store Redux
export default cartSlice;
