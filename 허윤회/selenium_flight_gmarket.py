import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs
import requests
import time

searchList=[["항공사","출발날짜","출발시간","출발공항","도착시간","도착공항","소요시간","가격"]]
#selenium을 사용해서 사이트 직접 열기
driver=webdriver.Chrome()

departure=["ICN"]
destination=["CDG"]

month=[31,28,31,30,31,30,31,31,30,31,30,31]
crawling_time = 0
for dep in departure:
    for des in destination:
        if dep == des: continue
        date='20230320'
        for a in range(0,30):
            start = time.time()
            url='https://air.gmarket.co.kr/gm/init/srp/srpResultView.do?TTYPE=global&RTYPE=fromkr&SECTN=OW&DSTAD='+dep+'&ASTAD='+des+'&DDATE='+date+'&NADT=1&NCHD=0&NINF=0&CLS=Y&VIAYN=false&MSITE=P'
            driver.get(url)
            mon=date[4:6]
            day=date[6:8]
            year=date[0:4]
            print(date)
            while True:
                time.sleep(1)
                html=driver.page_source
                soup=bs(html,'html.parser')
                loading_chk=soup.select('div#container .gt_content #SRP_SITE_DETAIL_INFO')
                if loading_chk != []:
                    # print('로딩 끝!')
                    break

            #페이지네이션 넘기는 코드
            while True:
                given_pages_length = len(driver.find_elements(By.CLASS_NAME, 'gt_paging_num')) #페이지 전체 길이 받고
                print('이번에 다룰 길이' + str(given_pages_length))
                for idx in range(given_pages_length):
                    given_pages = driver.find_elements(By.CLASS_NAME, 'gt_paging_num') #페이지네이션 전체
                    given_page = given_pages[idx] #이번에 크롤링할 페이지
                    # print('idx: '+str(idx))
                    # print('탐색 페이지' + given_page.text)
                    given_page.click() #클릭
                    while True:
                        time.sleep(1)
                        html=driver.page_source
                        soup=bs(html,'html.parser')
                        loading_chk=soup.select('div#container .gt_content .gt_loading_ico.srp_global.hide')
                        # print('페지네이션 비행기 로딩중...')
                        if loading_chk != []:
                            break
                    html=driver.page_source
                    soup=bs(html,'html.parser')
                    tickets = soup.select('div.gt_content li.gt_result_list_item')
                    crawling_time += len(tickets)
                    for ticket in tickets:
                        #항공사[항공사명]
                        air_name = ticket.select_one('div.gt_trip_card tbody td.gt_trip_card_airline')
                        code_share = False
                        if(air_name.select_one('a')):
                            code_share = True
                            air_name.select_one('a').decompose() #공동운항 알림제거
                        print('항공사 : ' + air_name.get_text().strip())
                        # air_name = air_name.get_text().strip()
                        #공동운항 여부[True/False]
                        print('코드쉐어 : ' + str(code_share))
                        # code_share = str(code_share)
                        #출발공항[공항명]
                        departure_airport = ticket.select_one('div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_departure span.gt_trip_route_airport')
                        print('출발공항 : ' + departure_airport.get_text().strip())
                        # departure_airport = departure_airport.get_text().strip()
                        #출발시간[HH:MM]
                        departure_time = ticket.select_one('div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_departure span.gt_trip_route_time')
                        print('출발시간 : ' + departure_time.get_text().strip())
                        departure_time = departure_time.get_text().strip()
                        #소요시간[HH:MM]
                        duration = ticket.select_one('div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_duration')
                        duration.select_one('span').decompose() #'소요시간' 제거
                        print('소요시간 : ' + duration.get_text().strip()) 
                        duration = duration.get_text().strip()
                        #도착공항[공항명]
                        destination_airport = ticket.select_one('div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_destination span.gt_trip_route_airport')
                        print('도착공항 : ' + destination_airport.get_text().strip())
                        destination_airport = destination_airport.get_text().strip()
                        #도착시간[HH:MM]
                        destination_time = ticket.select_one('div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_destination span.gt_trip_route_time')
                        if(destination_time.select_one('a')):
                            plus = destination_time.select_one('a').get_text().strip().split(" ")[0]
                            if(plus == '익일'): plus = '+1'
                            elif(plus == '2일후'): plus = '+2'
                            else: plus = '+3'
                            destination_time.select_one('a').decompose() #익일도착
                            print('도착시간 : ' + destination_time.get_text().strip()+plus)
                            # destination_time = destination_time.get_text().strip()+plus
                        else:
                            print()
                            print('도착시간 : ' + destination_time.get_text().strip())
                            # destination_time = destination_time.get_text().strip()
                        #비행 타입[직항/경유N]
                        type = ticket.select_one('div.gt_trip_card tbody td.gt_trip_card_way')
                        print('비행타입 : ' + type.get_text().strip())
                        # type = type.get_text().strip()
                        #항공가[000,000원]
                        price = ticket.select_one('div.gt_trip_card tbody td.gt_trip_card_total_price span.gt_total_price')
                        print('항공가 : ' + price.get_text().strip())
                        # price = price.get_text().strip()
                        #비행 상세 정보['itinerary - waiting - itineraray']
                        routes = ticket.select('div.sel_goods_detail tbody li.itinerary')
                        waitings = ticket.select('div.sel_goods_detail tbody li.waiting em')
                        for idx in range(len(routes)):
                            print('---상세경로'+str(idx)+'---')
                            route = routes[idx]
                            route_departure_time = route.select_one('div.country div.item_time').get_text().strip() #출발시간
                            route_departure_date = route.select_one('div.country div.item_date').get_text().strip() #출발일자
                            route_departure_airport = route.select_one('div.country div.item_country').get_text().strip() #출발공항
                            route_departure_code = route.select_one('div.country div.item_nation').get_text().strip() #출발코드
                            print('출발 : ' + route_departure_time +' / '+ route_departure_date +' / '+ route_departure_airport +' / '+ route_departure_code)
                            route_info_duration = route.select_one('div.info div.left').get_text().strip() #비행시간
                            route_info_flight = route.select_one('div.info div.right').get_text().strip() #항공편명
                            route_info_flight_share = '' #공동운항 항공사명
                            if('Operated by' in route_info_flight):
                                route_info_flight_share = route_info_flight.split('Operated by')[1].strip()
                                route_info_flight = route_info_flight.split('Operated by')[0].strip()
                            print('이동 : ' + route_info_duration +' / '+ route_info_flight + ' / ' + route_info_flight_share)
                            route_destination_time = route.select_one('div.last div.item_time') #도착시간
                            if(route_destination_time.select_one('a')):
                                plus = route_destination_time.select_one('a').get_text().strip().split(" ")[0]
                                if(plus == '익일'): plus = '+1'
                                elif(plus == '2일후'): plus = '+2'
                                else: plus = '+3'
                                route_destination_time.select_one('a').decompose() 
                                route_destination_time = route_destination_time.get_text().strip()+plus
                            else: route_destination_time = route_destination_time.get_text().strip()
                            route_destination_date = route.select_one('div.last div.item_date').get_text().strip() #도착일자
                            route_destination_airport = route.select_one('div.last div.item_country').get_text().strip() #도착공항
                            route_destination_code = route.select_one('div.last div.item_nation').get_text().strip() #도착코드
                            print('도착 : ' + route_destination_time +' / '+ route_destination_date +' / '+ route_destination_airport +' / '+ route_destination_code)
                            if(idx == len(routes)-1): break
                            waiting = waitings[idx]
                            print('---대기'+str(idx)+'---')
                            print(waiting.get_text().strip()) #경유대기시간
                            # waiting = waiting.get_text().strip()      
                            # last_page = soup.select_one('div.gt_content div.gt_paging a.spr_btn_end')['href'].split(" ")[1].replace("'", "")
                            # print(last_page)
                    print('-----------')
                #만약 지금이 마지막 페이지가 아니면 next button
                last_page = soup.select_one('div.gt_content div.gt_paging a.spr_btn_end')['href'].split(" ")
                if(len(last_page) > 1):
                    print('한번더!!')
                    driver.find_element(By.CLASS_NAME, 'spr_btn_next').click()
                    time.sleep(1)
                else:
                    break

            i_day=int(day)+1
            i_mon=int(mon)
            i_year=int(year)
            if month[i_mon-1]<i_day:
                i_day=1
                i_mon+=1
                if i_mon>11:
                    i_mon=0
                    i_year+=1
            date='%d%02d%02d'%(i_year,i_mon,i_day)
            print(str(a) +'일자 :' + str(crawling_time))
print(crawling_time)
            # air_name=[]
            # flight_money=[]
            # flight_place=[]
            # arrival_departure_time=[]
            # departure_time=[]
            # departure_air=[]
            # arrival_time=[]
            # arrival_air=[]
            # flights_time=[]
            # k=0
            # for i in air_names:
            #     air_name.append(i.get_text())
                
            # for i in flights_times:
            #     flights_time.append(i.get_text())

            # for i in flights_check:
            #         arrival_departure_time.append(i.get_text())

            # for k in range(len(arrival_departure_time)):
            #     if k%2==0:
            #         departure_time.append(arrival_departure_time[k])
            #     elif k%2==1:
            #         arrival_time.append(arrival_departure_time[k])

            # for i in flights_place:
            #         flight_place.append(i.get_text())

            # for k in range(len(flight_place)):
            #     if k%2==0:
            #         departure_air.append(flight_place[k])
            #     elif k%2==1:
            #         arrival_air.append(flight_place[k])

            # for i in flight_moneys:
            #     flight_money.append(i.get_text())

            # for i in range(len(air_name)):
            #     temp=[]
            #     temp.append(air_name[i])
            #     temp.append(date)
            #     temp.append(departure_time[i])
            #     temp.append(departure_air[i])
            #     temp.append(arrival_time[i])
            #     temp.append(arrival_air[i])
            #     temp.append(flights_time[i])
            #     temp.append(flight_money[i])
            #     searchList.append(temp)
 
            # f = open(f'['+dep+'-'+des+']'+date,'a',encoding='utf-8',newline='') #파일오픈
            # csvWriter = csv.writer(f)#열어둔 파일
            # for i in searchList:
            #     csvWriter.writerow(i) 

            # f.close()
            # print("완료 !"+ f"{time.time()-start:.4f} sec")
            
            # searchList=[]
            # i_day=int(day)+1
            # i_mon=int(mon)
            # i_year=int(year)
            # if month[i_mon-1]<i_day:
            #     i_day=1
            #     i_mon+=1
            #     if i_mon>11:
            #         i_mon=0
            #         i_year+=1
            # date='%d%02d%02d'%(i_year,i_mon,i_day)