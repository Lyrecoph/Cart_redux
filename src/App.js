import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-action';

// Variable pour suivre si c'est le premier rendu de l'application
let isInitial = true;

function App() {
  // Initialise le dispatch pour envoyer des actions
  const dispatch = useDispatch();

  // Sélectionne la visibilité du panier dans le state
  const showCart = useSelector((state) => state.ui.cartIsvisible);

  // Sélectionne les données du panier dans le state
  const cart = useSelector((state) => state.cart);
  
  // Sélectionne l'état des notifications dans le state
  const notification = useSelector((state) => state.ui.notification);

  // Effet pour récupérer les données du panier au chargement initial de l'application
  useEffect(() => {
    dispatch(fetchCartData()); // Appel de l'action pour récupérer les données du panier
  }, [dispatch]);

  // Effet pour envoyer les données du panier lorsque le contenu du panier change
  useEffect(() => {
    // Ne pas envoyer les données au premier rendu
    if(isInitial){
      isInitial = false; // Met à jour la variable pour éviter les prochaines exécutions
      return;
    }

    // Si le panier a été modifié, on envoie les données au backend
    if(cart.changed){
      dispatch(sendCartData(cart)); // Envoie les données du panier
    }
  }, [cart, dispatch]);

  return (
    <>
      {/* Affiche la notification si elle existe */}
      {notification && (
        <Notification 
          status={notification.status} 
          title={notification.title}
          message={notification.message}
        />)
      }
      <Layout>
        {/* Affiche le panier uniquement si `showCart` est vrai */}
        { showCart && <Cart /> }
        {/* Affiche les produits disponibles */}
        <Products />
      </Layout>
    </>
  );
}

export default App;
