package com.recipe.api.repositories;

import com.recipe.api.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findRecipesByUserId(int userId);
    List<Recipe> findRecipesByUser_Name(String userName);

    List<Recipe> findRecipesByNameContaining(String name);
    List<Recipe> findRecipesByNameContainingAndCuisineContaining(String name, String cuisine);
}
