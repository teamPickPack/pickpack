package com.ssafy.place.entity;

import lombok.AllArgsConstructor;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Tourist {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tourist_id")
    private Long id;
    private String touristName;
    private Float lat;
    private Float lng;
    private String imgUrl;
    @Enumerated(EnumType.STRING)
    private Continent continent;
    @Transient
    private String photoReference;

    public Tourist(String touristName, Float lat, Float lng, Continent continent, String photoReference) {
        this.touristName = touristName;
        this.lat = lat;
        this.lng = lng;
        this.continent = continent;
        this.photoReference = photoReference;
    }
}
