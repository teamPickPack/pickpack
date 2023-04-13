package com.pickpack.flightservice.service.tendency;

import com.pickpack.flightservice.api.response.TendencyRes;
import com.pickpack.flightservice.dto.tendency.TendencyInfoDto;
import com.pickpack.flightservice.entity.Tendency;
import com.pickpack.flightservice.repository.tendency.TendencyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
public class TendencyService {
    private final TendencyRepository tendencyRepository;

    public TendencyRes getTendency(Long ticketId){
        List<Tendency> tendencyList = tendencyRepository.findByTicketId(ticketId);
        if(tendencyList.isEmpty()){
            return null;
        }
        Tendency tendency = tendencyList.get(0);
        System.out.println("=============get Tendency===============");
        ArrayList<TendencyInfoDto> list = new ArrayList<>();
        String pastPrices = tendency.getPastPrices().replaceAll("\"", "");
        pastPrices = pastPrices + " ";
//        System.out.println(pastPrices);
        String[] inArr = pastPrices.split(", ");
//        System.out.println("=============split , ===============");
//        System.out.println(Arrays.toString(inArr));
//        System.out.println(inArr.length);
        for (int i = 0; i < inArr.length-1; i+=2) {
            String dateA = inArr[i].substring(1);
            String date = dateA.split(":")[1];
            String priceA = inArr[i+1].substring(0, inArr[i+1].length()-1);
            Integer price = Integer.parseInt(priceA.split(":")[1]);
//            System.out.println("dateA : " + dateA);
//            System.out.println("date : " + date);
//            System.out.println("priceA : " + priceA);
//            System.out.println("price : " + price);

            TendencyInfoDto tid = new TendencyInfoDto(date, price);
            System.out.println(tid.toString());
            list.add(tid);
        }
        TendencyRes tendencyRes = new TendencyRes(tendency.getAverage(), tendency.getChg(), tendency.getUpdown(), list);
        System.out.println(tendencyRes.toString());
        return tendencyRes;
    }
}
