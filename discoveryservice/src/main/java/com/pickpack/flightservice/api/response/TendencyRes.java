package com.pickpack.flightservice.api.response;

import com.pickpack.flightservice.dto.tendency.TendencyInfoDto;
import lombok.*;

import java.util.List;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TendencyRes {
    private Double average;
    private Double chg;
    private Integer updown;
    private List<TendencyInfoDto> info;
}
