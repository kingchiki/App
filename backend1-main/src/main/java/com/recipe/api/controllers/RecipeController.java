package com.recipe.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recipe.api.config.JwtService;
import com.recipe.api.models.Image;
import com.recipe.api.models.Recipe;
import com.recipe.api.models.User;
import com.recipe.api.repositories.UserRepository;
import com.recipe.api.services.Impl.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RequestMapping("/api/v1/recipe")
@RestController
public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @Autowired
    private UserRepository repository;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllRecipe() {
        try {
            List<Recipe> recipes = recipeService.getAll();
            return ResponseEntity.ok(recipes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/by-user")
    public ResponseEntity<?> getAllRecipeByUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);
            List<Recipe> recipes = recipeService.getRecipesByUserName(username);
            return ResponseEntity.ok(recipes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchRecipeOnline(@RequestParam String query, @RequestParam(required = false) String cuisine, @RequestParam(required = false) String isOnline) {
        try {
            if (Boolean.parseBoolean(isOnline)) {
                List<Map<String, Object>> recipes = recipeService.searchRecipeOnline(query, cuisine);
                return ResponseEntity.ok(recipes);
            } else {
                List<Recipe> recipes = recipeService.searchRecipesLocal(query, cuisine);
                return ResponseEntity.ok(recipes);
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/single/{id}")
    public ResponseEntity<?> singleRecipeOnline(@PathVariable String id, @RequestParam(required = false) String isOnline) {

        try {
            if (Boolean.parseBoolean(isOnline)) {
                Map<String, Object> recipe = recipeService.getSingleRecipeOnline(id);
                return ResponseEntity.ok(recipe);
            } else {
                Recipe recipe = recipeService.getSingleRecipe(Integer.parseInt(id));
                return ResponseEntity.ok(recipe);
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(path = "/write", consumes = {MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> writeNewRecipe(@RequestParam("file") MultipartFile file,
                                            @RequestHeader("Authorization") String authHeader,
                                            @RequestParam(value = "recipeData") String recipeData) {
        try {
            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);
            User user = repository.findByName(username).orElseGet(null);

            if (user != null) {
                Recipe recipe = new ObjectMapper().readValue(recipeData, Recipe.class);
                recipe.setUser(user);

                Image image = new Image();
                image.setFilename(file.getOriginalFilename());
                image.setMimeType(file.getContentType());
                image.setData(file.getBytes());
                image.setRecipe(recipe);

                recipe.setImage(image);
                Recipe recipeCreated = recipeService.create(recipe);

                return ResponseEntity.status(HttpStatus.CREATED).body(recipeCreated);
            } else {
                return ResponseEntity.badRequest().build();
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }

    }
}