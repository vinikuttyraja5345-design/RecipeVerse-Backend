const Recipe = require("../models/Recipe");

// =========================
// GET ALL RECIPES
// =========================
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Get Recipes Error:", error);

    res.status(500).json({
      message: "Failed to fetch recipes",
    });
  }
};

// =========================
// GET SINGLE RECIPE
// =========================
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Get Recipe Error:", error);

    res.status(500).json({
      message: "Failed to fetch recipe",
    });
  }
};

// =========================
// CREATE RECIPE
// =========================
const createRecipe = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      difficulty,
      cookTime,
      servings,
      tags,
      ingredients,
      instructions,
      cuisine,
      prepTimeMinutes,
      caloriesPerServing,
    } = req.body;

    if (
      !name ||
      !image ||
      !category ||
      !difficulty ||
      !cookTime ||
      !servings ||
      !ingredients ||
      !instructions
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const recipe = await Recipe.create({
      name,
      image,
      category,
      difficulty,
      cookTime,
      servings,
      tags,
      ingredients,
      instructions,
      cuisine,
      prepTimeMinutes,
      caloriesPerServing,
    });

    res.status(201).json({
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    console.error("Create Recipe Error:", error);

    res.status(500).json({
      message: "Failed to create recipe",
    });
  }
};

// =========================
// UPDATE RECIPE
// =========================
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    console.error("Update Recipe Error:", error);

    res.status(500).json({
      message: "Failed to update recipe",
    });
  }
};

// =========================
// DELETE RECIPE
// =========================
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(
      req.params.id
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Delete Recipe Error:", error);

    res.status(500).json({
      message: "Failed to delete recipe",
      error:error.message,
    });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};