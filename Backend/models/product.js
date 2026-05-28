const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    seller:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String, // image URL
        required: true,
      },
    ],

    category: {
      type: String,
      required: true,
      enum: ["Rings", "Necklaces", "Earrings", "Bracelets", "Anklets", "Mangalsutra"],
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    brand: {
      type: String,
      required:true,
      enum: ["Gold", "Silver", "Diamond", "Platinum"]
    },

    ratings: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        rating: Number,
        comment: String,
        
      },
    ],

  },
  { timestamps: true }
);

const PRODUCT = new mongoose.model("Product", productSchema);

module.exports = PRODUCT;
