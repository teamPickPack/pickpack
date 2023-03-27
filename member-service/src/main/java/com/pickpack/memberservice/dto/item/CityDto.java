package com.pickpack.memberservice.dto.item;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CityDto {

    private Long cityId;
    private String cityName;
}
