package com.pickpack.flightservice.dto.tendency;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TendencyInfoDto {
    String date;
    Integer price;
}
