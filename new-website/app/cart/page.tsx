"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const handleCheckout = () => {
    setCheckoutMessage("Your cart is ready. Checkout is a placeholder for this MVP, and real payment will be added soon.");
  };

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#eadcc2] bg-[#fffaf4] p-10 shadow-[0_12px_32px_rgba(47,23,23,0.04)]">
          <h1 className="text-4xl text-[#2f1717]">Your bag is empty</h1>
          <p className="mt-4 text-base leading-7 text-[#5f4340]">
            Browse our festive collections and add a few pieces to your cart.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-[#5a1d1d] px-6 py-3 text-sm font-medium text-[#fffaf4] transition-opacity hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-5xl text-[#2f1717]">Shopping bag</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-[1.4rem] border border-[#eadcc2] bg-[#fffaf4] p-4 sm:flex-row sm:items-center">
              <div className="relative h-32 w-full overflow-hidden rounded-[1rem] border border-[#eadcc2] bg-[#faf2ea] sm:w-28">
                <Image src={item.image} alt={item.name} fill sizes="100vw" className="object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl text-[#2f1717]">{item.name}</h2>
                    <p className="mt-2 text-base font-medium text-[#2f1717]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-[#7d3c2e] hover:text-[#5a1d1d]"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center overflow-hidden rounded-full border border-[#d4c1a5] bg-[#fffaf5]">
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-10 w-10 items-center justify-center text-lg text-[#2f1717] hover:bg-[#f2e6d4]"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-medium text-[#2f1717]">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity for ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center text-lg text-[#2f1717] hover:bg-[#f2e6d4]"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-base font-semibold text-[#2f1717]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[1.6rem] border border-[#eadcc2] bg-[#fffaf4] p-6 h-fit">
          <h2 className="text-2xl text-[#2f1717]">Summary</h2>

          <div className="mt-6 space-y-4 text-[#4a2c2a]">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="mt-6 border-t border-[#e5d4bb] pt-5">
            <div className="flex items-center justify-between text-lg font-semibold text-[#2f1717]">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="mt-6 w-full rounded-full bg-[#5a1d1d] px-5 py-3 text-sm font-medium text-[#fffaf4] transition-opacity hover:opacity-90"
          >
            Proceed to Checkout
          </button>

          {checkoutMessage && (
            <p className="mt-4 rounded-xl border border-[#e1c7a8] bg-[#f9f2e9] p-3 text-sm leading-6 text-[#4d2d2d]">
              {checkoutMessage}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
