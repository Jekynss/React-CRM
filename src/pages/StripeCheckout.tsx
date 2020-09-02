import React from "react";
import Checkout from "../components/Checkout/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const StripeCheckout: React.FC = () => {

  const stripePromise = loadStripe(
    "pk_test_51HHogTGTsbrmziT685QIKzmC4ZGpK5hIEoHSyVAe5av0iPrDHbEhNhHet2tkXTwtj971AlUBWwjV3n8oILuRIanX00o2stQDBD",
  );

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>)
};

export default (StripeCheckout);
