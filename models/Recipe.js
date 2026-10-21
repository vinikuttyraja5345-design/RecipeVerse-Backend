const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    cookTime: {
      type: Number,
      required: true,
    },

    servings: {
      type: Number,
      required: true,
    },

    tags: {
      type: String,
      default: "",
    },

    ingredients: {
      type: String,
      required: true,
    },

    instructions: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      default: "Indian",
    },

    prepTimeMinutes: {
      type: Number,
      default: 15,
    },

    caloriesPerServing: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);