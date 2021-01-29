import React, {useState, useEffect} from "react";
import './App.css';
import axios from 'axios';
import NavBar from './components/NavBar';
import PizzaForm from './components/PizzaForm';
import PizzaSuccess from './components/PizzaSuccess';
import Home from './components/Home';
import { Route, Switch } from "react-router-dom";

const initialFormValues = {
  size: '',
  sauce: '',
  pepperoni: false,
  extraCheese: false,
  glutenFree: false,
  instructions: '',
  // Add a number input
}

const initialErrorValues = {
  size: '',
  sauce: '',
  pepperoni: '',
  extraCheese: '',
  glutenFree: '',
  instructions: '',
}

const initialButtonValue = false;

const restaurantValues = [
  {
    name: "McDonald's",
    qualities: '$ - American - Fast Food - Burgers',
    time: '20-30 Min',
    fee: '$5.99 Delivery Fee',
    image: 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: "sweetgreen",
    qualities: '$ - Healthy - Salads',
    time: '30-45 Min',
    fee: '$4.99 Delivery Fee',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: "Starbucks",
    qualities: '$ - Cafe - Coffee & Tea - Breakfast and Brunch',
    time: '10-20 Min',
    fee: '$3.99 Delivery Fee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1794&q=80'
  }
]

const App = () => {
  // / / / / / / / Slices Of State / / / / / / / //
  const [formValues, setFormValues] = useState(initialFormValues);

  const [errors, setErrors] = useState(initialErrorValues);

  const [order, setOrder] = useState({});

  // / / / / / / / Event Handlers / / / / / / / //

  const handleChange = (name, value) => {
    setFormValues({
      ...formValues, [name]: value
    })
  };

  const handleSubmit = () => {
    const newOrder = {
      size: formValues.size.trim(),
      sauce: formValues.sauce.trim(),
      toppings: ['pepperoni', 'exCheese'].filter(topping => {
        return formValues[topping]
      }),
      glutenFree: formValues.glutenFree,
      instructions: formValues.instructions.trim(),
    }

    setOrder(newOrder);
  }

  // / / / / / / / Axios Request Helpers / / / / / / / //

  const postOrder = (newOrder) => {
    axios.post('https://reqres.in/api/pizza/', newOrder)
    .then(res => {
      console.log(res.data);
      setOrder(res.data);
      setFormValues(initialFormValues);
    })
    .catch(err => {
      console.log(err);
    });
  }


  return (
    <div>
      <NavBar />
      


      {/* ROUTES HERE */
      <Switch>

        <Route path={'/pizza'}>
          <PizzaForm values={formValues} errors={errors} change={handleChange} submit={handleSubmit} />
        </Route>
        <Route path={'/success'}>
          <PizzaSuccess details={order} />
        </Route>
        <Route path={'/'}>
          <Home values={restaurantValues} />
        </Route>
      </Switch>
      }

    </div>
  );
};
export default App;
