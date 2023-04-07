package com.pickpack.memberservice.firebase2;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ResponseDto {

    private Integer onewayLikeCount;
    private Integer roundwayLikeCount;

}
