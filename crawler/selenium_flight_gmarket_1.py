import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs
# import requests
import time

# selenium을 사용해서 사이트 직접 열기
driver = webdriver.Chrome()

# 1번 분량
departure = ["ICN"]
destination = ["CAI", "JNB", "CPT", "NBO", "ALG", "CMN", "LOS", "ACC", "DAR", "TUN", "DXB", "AUH", "TLV", "IKA", "DOH", "AMM", "KWI", "DMM", "JED", "RUH",
               "KTM", "DEL", "MAA", "BOM", "BLR", "CCU", "ULN", "MLE", "CMB", "TAS", "GRU", "GIG", "LIM", "MEX", "CUN", "EZE", "SCL", "BOG", "HAV", "UIO", "GUM", "SYD"]

month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
crawling_time = 0
# 공항 7개씩 나눠서 크롤링한다
total_len = len(destination) // 7
for n in range(total_len):
    # 파일 열기
    f = open(f'1_' + str(n), 'a', encoding='utf-8', newline='')  # 파일오픈
    csvWriter = csv.writer(f)  # 열어둔 파일

    for dep in departure:
        sub_idx = n * 7
        for sub in range(7):
            des = destination[sub_idx + sub]
            if dep == des:
                continue
            date = '20230407'
            # 7일치 크롤링한다
            for a in range(0, 7):
                start = time.time()
                url = 'https://air.gmarket.co.kr/gm/init/srp/srpResultView.do?TTYPE=global&RTYPE=fromkr&SECTN=OW&DSTAD=' + \
                    dep+'&ASTAD='+des+'&DDATE='+date+'&NADT=1&NCHD=0&NINF=0&CLS=Y&VIAYN=false&MSITE=P'
                driver.get(url)
                mon = date[4:6]
                day = date[6:8]
                year = date[0:4]
                print(date)
                searchList = []
                while True:
                    time.sleep(1)
                    html = driver.page_source
                    soup = bs(html, 'html.parser')
                    loading_chk = soup.select(
                        'div#container .gt_content #SRP_SITE_DETAIL_INFO')
                    if loading_chk != []:
                        # print('로딩 끝!')
                        break

                # 페이지네이션 넘기는 코드
                while True:
                    given_pages_length = len(driver.find_elements(
                        By.CLASS_NAME, 'gt_paging_num'))  # 페이지 전체 길이 받고
                    print('이번에 다룰 길이' + str(given_pages_length))
                    for idx in range(given_pages_length):
                        given_pages = driver.find_elements(
                            By.CLASS_NAME, 'gt_paging_num')  # 페이지네이션 전체
                        given_page = given_pages[idx]  # 이번에 크롤링할 페이지
                        # print('idx: '+str(idx))
                        # print('탐색 페이지' + given_page.text)
                        given_page.click()  # 클릭
                        while True:
                            time.sleep(1)
                            html = driver.page_source
                            soup = bs(html, 'html.parser')
                            loading_chk = soup.select(
                                'div#container .gt_content .gt_loading_ico.srp_global.hide')
                            # print('페지네이션 비행기 로딩중...')
                            if loading_chk != []:
                                break
                        html = driver.page_source
                        soup = bs(html, 'html.parser')
                        tickets = soup.select(
                            'div.gt_content li.gt_result_list_item')
                        crawling_time += len(tickets)
                        for ticket in tickets:
                            # 항공사[항공사명]
                            air_name = ticket.select_one(
                                'div.gt_trip_card tbody td.gt_trip_card_airline')
                            code_share = False
                            if (air_name.select_one('a')):
                                code_share = True
                                air_name.select_one(
                                    'a').decompose()  # 공동운항 알림제거
                            print('항공사 : ' + air_name.get_text().strip())
                            air_name = air_name.get_text().strip()
                            # 공동운항 여부[True/False]
                            print('코드쉐어 : ' + str(code_share))
                            code_share = str(code_share)
                            # 출발공항[공항명]
                            departure_airport = ticket.select_one(
                                'div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_departure span.gt_trip_route_airport')
                            print('출발공항 : ' + departure_airport.get_text().strip())
                            departure_airport = departure_airport.get_text().strip()
                            # 출발시간[HH:MM]
                            departure_time = ticket.select_one(
                                'div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_departure span.gt_trip_route_time')
                            print('출발시간 : ' + departure_time.get_text().strip())
                            departure_time = departure_time.get_text().strip()
                            # 소요시간[HH:MM]
                            duration = ticket.select_one(
                                'div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_duration')
                            duration.select_one(
                                'span').decompose()  # '소요시간' 제거
                            print('소요시간 : ' + duration.get_text().strip())
                            duration = duration.get_text().strip()
                            # 도착공항[공항명]
                            destination_airport = ticket.select_one(
                                'div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_destination span.gt_trip_route_airport')
                            print('도착공항 : ' +
                                  destination_airport.get_text().strip())
                            destination_airport = destination_airport.get_text().strip()
                            # 도착시간[HH:MM]
                            destination_time = ticket.select_one(
                                'div.gt_trip_card tbody td.gt_trip_card_route div.gt_trip_route_destination span.gt_trip_route_time')
                            if (destination_time.select_one('a')):
                                plus = destination_time.select_one(
                                    'a').get_text().strip().split(" ")[0]
                                if (plus == '익일'):
                                    plus = '1'
                                elif (plus == '2일후'):
                                    plus = '2'
                                else:
                                    plus = '3'
                                destination_time.select_one(
                                    'a').decompose()  # 익일도착
                                print('도착시간 : ' +
                                      destination_time.get_text().strip()+plus)
                                destination_time = destination_time.get_text().strip()
                            else:
                                print()
                                plus = '0'
                                print('도착시간 : ' +
                                      destination_time.get_text().strip())
                                destination_time = destination_time.get_text().strip()
                            # 비행 타입[직항/경유N]
                            type = ticket.select_one(
                                'div.gt_trip_card tbody td.gt_trip_card_way')
                            print('비행타입 : ' + type.get_text().strip())
                            type = type.get_text().strip()
                            # 항공가[000,000원]
                            price = ticket.select_one(
                                'div.gt_trip_card tbody td.gt_trip_card_total_price span.gt_total_price')
                            print('항공가 : ' + price.get_text().strip())
                            price = price.get_text().strip()
                            price = price.replace(',', '')

                            # 티켓 정보 저장
                            temp = []
                            temp.append(date)
                            temp.append(" " + air_name)
                            temp.append(" " + code_share)
                            temp.append(" " + departure_airport)
                            temp.append(" " + departure_time)
                            temp.append(" " + duration)
                            temp.append(" " + destination_airport)
                            temp.append(" " + destination_time)
                            temp.append(" " + plus)
                            temp.append(" " + type)
                            temp.append(" " + price)

                            # 비행 상세 정보['itinerary - waiting - itineraray']
                            routes = ticket.select(
                                'div.sel_goods_detail tbody li.itinerary')
                            waitings = ticket.select(
                                'div.sel_goods_detail tbody li.waiting em')
                            for idx in range(len(routes)):

                                if (idx == 0):
                                    print('0'+'시간')
                                    # 처음 일정 대기시간은 0
                                    temp.append(" " + '0시간')

                                print('---상세경로'+str(idx)+'---')
                                route = routes[idx]
                                route_departure_time = route.select_one(
                                    'div.country div.item_time').get_text().strip()  # 출발시간
                                route_departure_date = route.select_one(
                                    'div.country div.item_date').get_text().strip()  # 출발일자
                                route_departure_airport = route.select_one(
                                    'div.country div.item_country').get_text().strip()  # 출발공항
                                route_departure_code = route.select_one(
                                    'div.country div.item_nation').get_text().strip()  # 출발코드
                                print('출발 : ' + route_departure_time + ' / ' + route_departure_date +
                                      ' / ' + route_departure_airport + ' / ' + route_departure_code)

                                # 상세경로 출발정보 저장
                                temp.append(" " + route_departure_time)
                                temp.append(" " + route_departure_date)
                                temp.append(" " + route_departure_airport)
                                temp.append(" " + route_departure_code)

                                route_info_duration = route.select_one(
                                    'div.info div.left').get_text().strip()  # 비행시간\]po
                                route_info_flight = route.select_one(
                                    'div.info div.right').get_text().strip()  # 항공편명
                                route_info_flight_share = 'False'  # 공동운항 항공사명
                                if ('Operated by' in route_info_flight):
                                    route_info_flight_share = route_info_flight.split('Operated by')[
                                        1].strip()
                                    route_info_flight = route_info_flight.split('Operated by')[
                                        0].strip()
                                print('이동 : ' + route_info_duration + ' / ' +
                                      route_info_flight + ' / ' + route_info_flight_share)

                                # 중간 경유지[경유지명(공항코드)]
                                if (route.select_one('div.country div.right div.item_airport')):
                                    route_info_mid_waypoint = route.select_one(
                                        'div.country div.right div.item_airport')
                                    if (route_info_mid_waypoint.select_one('a')):
                                        route_info_mid_waypoint.select_one(
                                            'a').decompose()
                                    route_info_mid_waypoint = route_info_mid_waypoint.get_text().strip().replace("\n", "")
                                    route_info_mid_waypoint = route_info_mid_waypoint.split('중간 경유 : ')[
                                        1]
                                    route_info_mid_waypoint = route_info_mid_waypoint.strip()
                                else:
                                    route_info_mid_waypoint = 'False'

                                print('중간경유지 : ' + route_info_mid_waypoint)

                                # 이동 정보 저장
                                temp.append(" " + route_info_duration)
                                temp.append(" " + route_info_flight)
                                temp.append(" " + route_info_flight_share)
                                temp.append(" " + route_info_mid_waypoint)

                                route_destination_time = route.select_one(
                                    'div.last div.item_time')  # 도착시간
                                if (route_destination_time.select_one('a')):
                                    plus = route_destination_time.select_one(
                                        'a').get_text().strip().split(" ")[0]
                                    if (plus == '익일'):
                                        plus = '1'
                                    elif (plus == '2일후'):
                                        plus = '2'
                                    else:
                                        plus = '3'
                                    route_destination_time.select_one(
                                        'a').decompose()
                                    route_destination_time = route_destination_time.get_text().strip()
                                else:
                                    route_destination_time = route_destination_time.get_text().strip()
                                plus = '0'
                                route_destination_date = route.select_one(
                                    'div.last div.item_date').get_text().strip()  # 도착일자
                                route_destination_airport = route.select_one(
                                    'div.last div.item_country').get_text().strip()  # 도착공항
                                route_destination_code = route.select_one(
                                    'div.last div.item_nation').get_text().strip()  # 도착코드
                                print('도착 : ' + route_destination_time + ' / ' + route_destination_date +
                                      ' / ' + route_destination_airport + ' / ' + route_destination_code)

                                # 상세경로 도착정보 저장
                                temp.append(" " + route_destination_time)
                                temp.append(" " + plus)
                                temp.append(" " + route_destination_date)
                                temp.append(" " + route_destination_airport)
                                temp.append(" " + route_destination_code)

                                if (idx == len(routes)-1):
                                    break
                                waiting = waitings[idx]
                                print('---대기'+str(idx)+'---')
                                print(waiting.get_text().strip())  # 경유대기시간
                                waiting = waiting.get_text().strip()

                                # 경유 있을 경우 대기시간
                                temp.append(" " + waiting)

                            searchList.append(temp)

                            # waiting = waiting.get_text().strip()
                            # last_page = soup.select_one('div.gt_content div.gt_paging a.spr_btn_end')['href'].split(" ")[1].replace("'", "")
                            # print(last_page)
                        print('-----------')

                    # 만약 지금이 마지막 페이지가 아니면 next button
                    last_page = soup.select_one('div.gt_content div.gt_paging a.spr_btn_end')[
                        'href'].split(" ")
                    if (len(last_page) > 1):
                        print('한번더!!')
                        driver.find_element(
                            By.CLASS_NAME, 'spr_btn_next').click()
                        time.sleep(1)
                    else:
                        break

                #파일에 리스트 옮기기
                for i in searchList:
                    csvWriter.writerow(i)

                i_day = int(day)+1
                i_mon = int(mon)
                i_year = int(year)
                if month[i_mon-1] < i_day:
                    i_day = 1
                    i_mon += 1
                    if i_mon > 11:
                        i_mon = 0
                        i_year += 1
                date = '%d%02d%02d' % (i_year, i_mon, i_day)
                print(str(a) + '일자 :' + str(crawling_time))
    print(crawling_time)

    f.close()
    print("완료 !" + f"{time.time()-start:.4f} sec")

    # 공항 7개 크롤링하고 휴식
    print('휴식!!!!!!!!!!!!!!!!')
    time.sleep(600)