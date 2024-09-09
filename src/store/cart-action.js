import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

// Action asynchrone pour récupérer les données du panier depuis une base de données (ex : Firebase)
export const fetchCartData = () => {
    return async (dispatch) => {
        // Fonction interne pour effectuer la requête de récupération des données du panier
        const fetchCartData = async () => {
            // Requête GET vers Firebase pour récupérer les données du panier
            const response = await fetch(
                'https://redux-app-e55ae-default-rtdb.firebaseio.com/cart.json',
            );

            if(!response.ok){
                // Si la réponse n'est pas "ok", on lance une erreur
                throw new Error('Could not fetch cart data!');
            }

            // Récupère les données en format JSON
            const data = await response.json();

            return data; // Retourne les données récupérées
        };

        try {
            // Exécute la fonction de récupération et stocke les données du panier
            const cartData = await fetchCartData();

            // Remplace le panier actuel par les données récupérées
            dispatch(cartActions.replaceCart({
                items: cartData.items || [], // Si aucun item, renvoie un tableau vide
                totalQuantity: cartData.totalQuantity
            }));
        } catch (error) {
            // Si une erreur survient, une notification d'erreur est affichée
            dispatch(
              uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!' // Message d'erreur à afficher
              })
            );
        }
    };
};

// Action asynchrone pour envoyer les données du panier au backend
export const sendCartData = (cart) => {
    return async (dispatch) => {
      // Affiche une notification d'envoi en cours
      dispatch(
        uiActions.showNotification({
          status: 'pending', // Statut "en attente"
          title: 'Sending....',
          message: 'Sending cart data!' // Indique que les données sont en cours d'envoi
        })
      );
  
      // Fonction interne pour envoyer la requête PUT
      const sendRequest = async () => {
        const response = await fetch(
          'https://redux-app-e55ae-default-rtdb.firebaseio.com/cart.json', 
          {
            method: 'PUT', // Méthode PUT pour remplacer les données
            body: JSON.stringify({
                items: cart.items, // Envoi des articles du panier
                totalQuantity: cart.totalQuantity, // Envoi de la quantité totale
            }),
          }
        );
    
        if (!response.ok) {
          throw new Error('Sending cart data failed'); // Si une erreur survient
        }
      };
  
      try {
        await sendRequest(); // Exécute la requête

        // Si l'envoi réussit, affiche une notification de succès
        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully'
        }));
      } catch (error) {
        // Si une erreur survient lors de l'envoi, affiche une notification d'erreur
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent cart data failed!'
        }));
      }
    };
};
