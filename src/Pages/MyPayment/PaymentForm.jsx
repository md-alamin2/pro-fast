import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import MyPayment from "./MyPayment";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import swal from "sweetalert2";

const PaymentForm = ({ parcel, id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const payAmount = parcel.cost;

  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    // step-1: validate card
    if (error) {
      return setError(error.message);
    } else {
      setError("");

      const amountInCents = payAmount * 100;

      // step-2 create payment intent
      const res = await axiosSecure.post("create-payment-intent", {
        amountInCents,
        parcelId: id,
      });

      const clientSecret = res.data.clientSecret;
      // step-3: confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || "User",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("payment succeeded");
          console.log(result);

          // step-4: mark parcel paid also create a payment history
          const paymentData = {
            cost: payAmount,
            created_by: parcel.created_by,
            _id: id,
            paid_by:user?.displayName,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const paymentRes = await axiosSecure.post("payments", paymentData);
          console.log(paymentRes);
          if (paymentRes.data.insertedId) {
            swal.fire({
              title: "Payment Done Successfully",
              icon: "success",
            });
            document.getElementById(id).close()
          }
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement className="bg-base-100 py-4 mx-auto"></CardElement>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary btn-sm mt-2 text-black"
        >
          Pay {payAmount}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
