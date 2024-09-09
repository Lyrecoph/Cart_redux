// Nous voulons que lorsque nous cliquons sur le btn My cart
// nous affichons ou cachons le panier
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    // nom de notre magasin
    name: 'ui',
    // les états initial de notre magasin
    initialState: {cartIsvisible: false, notification: null},
    // contient des méthodes de notre magasin
    reducers: {
        toggle(state){
            state.cartIsvisible = !state.cartIsvisible
        },

        showNotification(state, action){
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;

