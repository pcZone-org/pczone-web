"use client"
import CheckoutPage from "../../components/CheckoutPage";
import convertToSubcurrency from "../../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Pagos(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const amount = Number(searchParams.get('monto') || 0);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Tenés que iniciar sesión para comprar");
            router.push("/login");
        }
    }, []);
    
    return (
        <div className="max-w-6xl mx-auto mb-4 p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-blue-800">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">PCZone</h1>
                <h2 className="text-2xl">
                Ha solicitado pagar
                <span className="font-bold"> ${amount}</span>
                </h2>
            </div>

            <Elements
                stripe={stripePromise}
                options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "usd",
                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>
        </div>
    );
}