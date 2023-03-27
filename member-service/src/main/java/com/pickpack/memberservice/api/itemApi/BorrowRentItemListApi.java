package com.pickpack.memberservice.api.itemApi;

import com.pickpack.memberservice.dto.item.ItemDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class BorrowRentItemListApi {

    private List<ItemDto> borrowItemList;
    private List<ItemDto> rentItemList;

}
