package com.pickpack.memberservice.api.itemApi;

import com.pickpack.memberservice.dto.item.ItemDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BuySellItemListApi implements Serializable {

    private List<ItemDto> buyItemList;
    private List<ItemDto> sellItemList;

}
