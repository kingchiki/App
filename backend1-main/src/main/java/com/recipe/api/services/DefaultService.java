package com.recipe.api.services;

import java.util.List;

public interface DefaultService<T> {
    T create(T t);
    T update(T t);
    T findById(int id);
    void delete(int id);
    List<T> getAll();
}
