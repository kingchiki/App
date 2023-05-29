package com.recipe.api.services.Impl;

import com.recipe.api.models.Recipe;
import com.recipe.api.repositories.RecipeRepository;
import com.recipe.api.services.DefaultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service("recipeService")
public class RecipeService implements DefaultService<Recipe> {

    @Value("${API_KEY}")
    private String API_KEY;

    @Value("${SEARCH_URL}")
    private String SEARCH_URL;


    RestTemplate restTemplate = new RestTemplateBuilder()
    .additionalInterceptors((request, body, execution) -> {
        ClientHttpResponse response = execution.execute(request, body);
        System.out.println("Response headers: {}" +  response.getHeaders());
        return response;
    })
            .build();;

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Recipe create(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe update(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe findById(int id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        recipeRepository.deleteById(id);
    }

    @Override
    public List<Recipe> getAll() {
        return recipeRepository.findAll();
    }

    public List<Recipe> getRecipesByUser(Integer id) {
        return recipeRepository.findRecipesByUserId(id);
    }

    public List<Recipe> getRecipesByUserName(String userName) {
        return recipeRepository.findRecipesByUser_Name(userName);
    }

    public List<Recipe> searchRecipesLocal(String query, String cuisine) {
        if (query != null && cuisine != null)
            return recipeRepository.findRecipesByNameContainingAndCuisineContaining(query, cuisine);
        else if (query != null && !query.equals("null"))
            return recipeRepository.findRecipesByNameContaining(query);
        else
            return recipeRepository.findAll();
    }

    public List<Map<String, Object>> searchRecipeOnline(String query, String cuisine) {

        String endpointUrl = SEARCH_URL + "/complexSearch?apiKey=" + API_KEY +
                "&query=" + query +
                "&cuisine=" + cuisine;
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(endpointUrl, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {
        });

        Map<String, Object> response =  responseEntity.getBody();

        return (List<Map<String, Object>>) response.get("results");
    }

    public Map<String, Object> getSingleRecipeOnline(String id) {

        String endpointUrl = SEARCH_URL + "/" + id + "/information?apiKey=" + API_KEY;
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(endpointUrl, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {
        });

        return  responseEntity.getBody();
    }

    public Recipe getSingleRecipe(Integer id) {
        return recipeRepository.findById(id).orElse(null);
    }
}
