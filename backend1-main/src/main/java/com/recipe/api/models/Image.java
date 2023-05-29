package com.recipe.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String filename;

    private String mimeType;

    @Lob
    @Column(length=100000)
    private byte[] data;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
}