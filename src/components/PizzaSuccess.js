import React from 'react';


export default function PizzaSuccess(props){

    const { size, sauce, toppings, glutenFree, instructions } = props.details;

    console.log(props);

    return (
        <div>
            <h2>Success!</h2> <br />
            <p>Your {!glutenFree} {size} pizza with {sauce} sauce and {toppings} following your instructions to {instructions} is on it's way!</p> <br />
            <h3>It's pizza time!</h3>
    
        </div>
    )
}