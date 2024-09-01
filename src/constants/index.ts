import { MapPinned, ShoppingCart, TimerReset } from "lucide-react";

import {
  facebook,
  instagram,
  shieldTick,
  support,
  truckFast,
  twitter,
} from "../../public/assets/icons";
import {
  cot1,
  babyCarrier1,
  bigStroller1,
  bigStroller2,
  carSeat1,
  carSeat2,
  customer1,
  customer2,
} from "../../public/assets/images";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#explore", label: "About Us" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/products", label: "Shop" },
];

export const strollers = [
  {
    thumbnail: bigStroller1,
    large: bigStroller1,
  },
  {
    thumbnail: bigStroller2,
    large: bigStroller2,
  },
  {
    thumbnail: carSeat1,
    large: carSeat1,
  },
];

export const statistics = [
  { value: "1k+", label: "Brands" },
  { value: "500+", label: "Shops" },
  { value: "250k+", label: "Customers" },
];

export const popularProducts = [
  {
    imgURL: carSeat2,
    name: "All-In-One Car Seat",
    price: "$200.20",
    rating: 4.5,
  },
  {
    imgURL: bigStroller1,
    name: "Baby Stroller",
    price: "$210.20",
    rating: 4.8,
  },
  {
    imgURL: babyCarrier1,
    name: "Premium Baby Carrier",
    price: "$220.20",
    rating: 4.5,
  },
  {
    imgURL: cot1,
    name: "Baby cot",
    price: "$230.20",
    rating: 4.9,
  },
];

export const services = [
  {
    imgURL: truckFast,
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    imgURL: shieldTick,
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    imgURL: support,
    label: "Love to help you",
    subtext: "Our dedicated team is here to assist you every step of the way.",
  },
];

export const reviews = [
  {
    imgURL: customer1,
    customerName: "Adeola Olumide",
    rating: 4.9,
    feedback:
      "The quality of the baby products exceeded my expectations. Highly recommended!",
  },
  {
    imgURL: customer2,
    customerName: "Lerato Mabaso",
    rating: 5.0,
    feedback:
      "Amazing products. Amazing service. I'll definitely be coming back for more!",
  },
];

export const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "Baby Carrier", link: "/products" },
      { name: "Baby Walker", link: "/products" },
      { name: "Stroller", link: "/products" },
      { name: "Playpen", link: "/products" },
      { name: "Baby Bouncer", link: "/products" },
      { name: "Baby Playmat", link: "/products" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "How it works", link: "/" },
      { name: "Privacy policy", link: "/" },
      { name: "Payment policy", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      {
        name: "customer@gracelandng.com",
        link: "mailto:customer@gracelandng.com",
      },
      { name: "+92554862354", link: "tel:+92554862354" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];

// Product filters
export const filterOptions = [
  {
    heading: "Categories",
    options: [
      { id: "stroller", label: "Stroller" },
      { id: "playpen", label: "Playpen" },
      { id: "carseats", label: "Carseats" },
    ],
  },
  {
    heading: "Colors",
    options: [
      { id: "blue", label: "blue" },
      { id: "white", label: "white" },
      { id: "black", label: "black" },
    ],
  },
];

// Define an array of radio button filters
export const sortOptions = [
  { value: "new", id: "r1", label: "New Arrivals" },
  { value: "desc", id: "r2", label: "Price high to low" },
  { value: "asc", id: "r3", label: "Price low to high" },
];

export const accountSignUpBenefits = [
  {
    icon: ShoppingCart,
    title: "Fast Checkout.",
    description: "Your payment is saved and ready.",
  },
  {
    icon: MapPinned,
    title: "Easy Tracking.",
    description: "Track your orders effortlessly.",
  },
  {
    icon: TimerReset,
    title: "Quick Recap.",
    description: "Review your order history quickly.",
  },
];

export const orderStatuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Verify with Paystack",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Completed",
  "Cancelled",
  "Returned",
  "Refunded",
];
