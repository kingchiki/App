package com.recipe.api.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String cuisine;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private Double readyInMinutes;

    @OneToOne(mappedBy = "recipe", cascade = CascadeType.ALL)
    private Image image;

    @ManyToOne()
    private User user;
}
