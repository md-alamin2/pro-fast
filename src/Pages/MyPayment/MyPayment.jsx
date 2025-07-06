import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const MyPayment = ({ parcel, id }) => {
  return (
    <Elements stripe={stripePromise}>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <PaymentForm id={id} parcel={parcel}></PaymentForm>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </Elements>
  );
};

export default MyPayment;
