package com.pickpack.itemservice.service.item;

import com.pickpack.itemservice.dto.item.ItemListDto;
import com.pickpack.itemservice.entity.Category;
import com.pickpack.itemservice.entity.City;
import com.pickpack.itemservice.entity.Item;
import com.pickpack.itemservice.entity.Member;
import com.pickpack.itemservice.exception.CityIsNullException;
import com.pickpack.itemservice.exception.ListEmptyException;
import com.pickpack.itemservice.exception.MemberIsNullException;
import com.pickpack.itemservice.repository.city.CityRepository;
import com.pickpack.itemservice.repository.item.ItemRepository;
import com.pickpack.itemservice.repository.member.MemberRepository;
import com.pickpack.itemservice.s3.AwsS3Uploader;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final AwsS3Uploader s3Uploader;
    private static String dirName = "item";

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
            throw new MemberIsNullException("회원 ID가 적절하지 않습니다.");
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

    public List<ItemListDto> getItemsWithCategory(String categoryStr){
        List<ItemListDto> items = itemRepository.getItemsWithCategory(categoryStr);
        if(items.isEmpty()){
            throw new ListEmptyException("item 목록이 없습니다.");
        }
        return items;
    }

    public List<ItemListDto> getItemsSearchOnTitle(String categoryStr, String search){
        List<ItemListDto> items = itemRepository.getItemsSearchOnTitle(categoryStr, search);
        if(items.isEmpty()){
            throw new ListEmptyException(search + "에 대한 검색 결과가 없습니다.");
        }
        return items;
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
