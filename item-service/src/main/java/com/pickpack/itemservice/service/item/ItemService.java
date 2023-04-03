package com.pickpack.itemservice.service.item;

import com.pickpack.itemservice.api.response.ItemDetailRes;
import com.pickpack.itemservice.api.response.ListRes;
import com.pickpack.itemservice.dto.item.ItemDetailDto;
import com.pickpack.itemservice.dto.item.ItemListDto;
import com.pickpack.itemservice.entity.*;
import com.pickpack.itemservice.exception.CityIsNullException;
import com.pickpack.itemservice.exception.ListEmptyException;
import com.pickpack.itemservice.exception.IsNullException;
import com.pickpack.itemservice.repository.city.CityRepository;
import com.pickpack.itemservice.repository.item.ItemRepository;
import com.pickpack.itemservice.repository.itemLike.ItemLikeRepository;
import com.pickpack.itemservice.repository.member.MemberRepository;
import com.pickpack.itemservice.s3.AwsS3Uploader;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final CityRepository cityRepository;
    private final MemberRepository memberRepository;
    private final ItemLikeRepository itemLikeRepository;
    private final AwsS3Uploader s3Uploader;
    private static String dirName = "item";
    private static Integer itemSize = 12;

    public Long createItem(Long memberId, String title, String categoryStr, Integer price, String content, String itemName, Long cityId, MultipartFile img){
        // city get
        Optional<City> cityOptional = cityRepository.findById(cityId);
        if(cityOptional.isEmpty()){
            throw new CityIsNullException("도시 ID가 적절하지 않습니다.");
        }
        City city = cityOptional.get();
        // member get
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if(memberOptional.isEmpty()){
            throw new IsNullException("회원 ID가 적절하지 않습니다.");
        }
        Member member = memberOptional.get();
        Item item = Item.createItem(title, str2Category(categoryStr), price, content, itemName, city, member);

        String imgUrl = null;
        try {
            imgUrl = s3Uploader.upload(img, dirName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        item.setImage(imgUrl);
        itemRepository.save(item);
        return item.getId();
    }

    public ListRes getItemsWithCategory(String categoryStr, Integer page){
        PageRequest pageRequest = PageRequest.of(page, itemSize);

        ListRes items = itemRepository.getItemsWithCategory( pageRequest, categoryStr);

        List<ItemListDto> lists = (List<ItemListDto>) items.getResults();
        if(lists.isEmpty()){
            throw new ListEmptyException("item 목록이 없습니다.");
        }

        return items;
    }

    public ListRes getItemsSearchOnTitle(String categoryStr, String search, Integer page){
        PageRequest pageRequest = PageRequest.of(page, itemSize);
        ListRes items = itemRepository.getItemsSearchOnTitle(pageRequest, categoryStr, search);

        List<ItemListDto> lists = (List<ItemListDto>) items.getResults();
        if(lists.isEmpty()){
            throw new ListEmptyException(search + "에 대한 검색 결과가 없습니다.");
        }

        return items;
    }

    public ListRes getItemsSearchOnCity(String categoryStr, Long cityId, Integer page){
        PageRequest pageRequest = PageRequest.of(page, itemSize);
        ListRes items = itemRepository.getItemsSearchOnCity(pageRequest, categoryStr, cityId);


        List<ItemListDto> lists = (List<ItemListDto>) items.getResults();
        if(lists.isEmpty()){
            throw new ListEmptyException(cityId + "번 도시에 대한 검색 결과가 없습니다.");
        }

        return items;
    }

    public ItemDetailRes getItemById(Long itemId, Long memberId){
        ItemDetailDto item = itemRepository.getItemById(itemId);
        List<ItemLike> itemLikeList = itemLikeRepository.findByItemIdAndMemberIdAndIsDelete(itemId, memberId, false);
        Boolean isLike = Boolean.TRUE;
        if(itemLikeList.isEmpty()){
           isLike = Boolean.FALSE;
        }
        if(item == null){
            throw new IsNullException(itemId + "에 해당하는 물품 게시글이 없습니다.");
        }
        List<ItemListDto> items = itemRepository.getItemsByMember(itemId, item.getMemberId(), item.getCategory());
//        item.setItemList(getOtherItemsOfItemById((List<Item>)  item.getItemList(), item.getMemberId()));

        return new ItemDetailRes(isLike, item, items);
    }

    public Long completeItem(Long itemId){
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new IsNullException(itemId + "에 해당하는 물품 게시글이 없습니다."));
        item.complete();
        itemRepository.save(item);
        return item.getId();
    }

    private Category str2Category(String categoryStr){
        Category category = null;
        switch (categoryStr){
            case "BUY":
                category = Category.BUY;
                break;
            case "SELL":
                category = Category.SELL;
                break;
            case "BORROW":
                category = Category.BORROW;
                break;
            case "RENT":
                category = Category.RENT;
                break;
        }
        return category;
    }


}
