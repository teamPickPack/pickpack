package com.ssafy.place.config;

import com.google.gson.*;
import com.ssafy.place.entity.City;
import com.ssafy.place.entity.Continent;
import com.ssafy.place.entity.Place;
import com.ssafy.place.entity.Tourist;
import com.ssafy.place.repository.TouristRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

@Component
@RequiredArgsConstructor
public class initDB {
    private final InitService initService;
    private final TouristRepository touristRepository;
    static final String APIKEY = "AIzaSyBfZy9M7rOgL0CpT9VdROmNKKLqP4br1uU"; // api key
    static final int RADIUS=500000;
    static final String LANG = "ko";
    static final String TYPE = "tourist_attraction";
    @PostConstruct
    public void init() throws Exception{
        initService.dbInit();
    }
    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        public Map<String, ArrayList<City>> input() throws IOException {
            Map<String, ArrayList<City>> result = new HashMap<>();

            BufferedReader br = new BufferedReader(new FileReader(("C:/Users/SSAFY/Documents/CityList.txt")));
            String key = br.readLine();
            String str;
            ArrayList<City> list = new ArrayList<>();
            System.out.println(key);
            while((str= br.readLine()) != null){
                str = str.replace(": ", ",");
                String[] inArr = str.split(",");
                if(inArr.length == 1){
                    result.put(key, list);
                    list = new ArrayList<>();
                    key = str;
                }else{
                    String name = inArr[0].trim();
                    Float lat = Float.valueOf(inArr[2].trim());
                    Float lng = Float.valueOf(inArr[3].trim());
                    list.add(new City(name, lat, lng));
                }
            }
            br.close();
            return result;
        }

        public void dbInit() throws Exception{
            Map<String, ArrayList<City>> cityList = input();
            for (Map.Entry<String, ArrayList<City>> entry : cityList.entrySet()) {

                for (int i = 0; i < entry.getValue().size(); i++) {
                    City city = entry.getValue().get(i);
                    Set<Tourist> setT = getTouristSet(city, entry.getKey());
                    for (Tourist tourist : setT) {
                        insertTourist(tourist);
                    }
                }
            }
        }
        public void insertTourist(Tourist tourist) throws Exception{
            getPhoto(tourist.getPhotoReference());
            // s3버킷에 저장하고 image url 가져오기
            // tourist에 image url 설정
            // tourist db에 저장
        }
        public Set<Tourist> getTouristSet(City city, String key){
            Continent continent = getContinent(key);
            Set<Tourist> setT = new HashSet<>();
            String result = getPlace(city.getLat(), city.getLng(), city.getName());
            Gson gson = new Gson();

            JsonElement jsonElement = JsonParser.parseString(result);
            JsonObject jsonObject = jsonElement.getAsJsonObject();

            JsonArray jsonArray = jsonObject.getAsJsonArray("results");
            Place[] places = gson.fromJson(jsonArray, Place[].class);
            for (int i = 0; i < 5; i++) {
                Float pLat = places[i].getGeometry().getLocation().getLat();
                Float pLng = places[i].getGeometry().getLocation().getLng();
                String pPhotoReference = getPhotoReference(places[i].getPhotos().get(0).toString());
                Tourist tourist = new Tourist(places[i].getName(), pLat, pLng, continent, pPhotoReference);
                setT.add(tourist);
            }
            return setT;
        }
        public Continent getContinent(String str){
            switch (str){
                case "남아메리카": return Continent.SAMERICA;
                case "북아메리카": return Continent.NAMERICA;
                case "아프리카": return Continent.AFRICA;
                case "아시아": return Continent.ASIA;
                case "유럽": return Continent.EUROPE;
                case "오세아니아": return Continent.OCEANIA;
                default:
                    return null;
            }
        }
        static String getPhotoReference(String str){
            String[] splitPhotos = str.split(", ");
            splitPhotos = splitPhotos[2].split("=");
            return splitPhotos[1];
        }

        static String getPlace(double lat, double lon, String city){
            StringBuilder apiURL = new StringBuilder();
            apiURL.append("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=").append(lat).append(",").append(lon);
            apiURL.append("&radius=").append(RADIUS);
            apiURL.append("&keyword=").append(city).append(",").append("관광지");
            apiURL.append("&key=").append(APIKEY);
            apiURL.append("&language=").append(LANG);
            apiURL.append("&types=").append(TYPE);

            return get(apiURL.toString());
        }

        static void getPhoto(String photoReference) throws Exception{
            StringBuilder apiURL = new StringBuilder();
            apiURL.append("https://maps.googleapis.com/maps/api/place/photo?maxwidth=700");
            apiURL.append("&photo_reference=").append(photoReference);
            apiURL.append("&key=").append(APIKEY);
            URL url = new URL(apiURL.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setDoInput(true);
            InputStream inputStream = conn.getInputStream();
            File file = new File("photo.jpg");
            if(file.exists()){
                file.delete();
            }

            FileOutputStream fileOutputStream = new FileOutputStream("photo.jpg");
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) != -1) {
                fileOutputStream.write(buffer, 0, len);
            }
            fileOutputStream.close();
            inputStream.close();
        }

        private static String get(String apiUrl){
            HttpURLConnection con = connect(apiUrl);
            try {
                con.setRequestMethod("GET");

                int responseCode = con.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                    return readBody(con.getInputStream());
                } else { // 오류 발생
                    return readBody(con.getErrorStream());
                }
            } catch (IOException e) {
                throw new RuntimeException("API 요청과 응답 실패", e);
            } finally {
                con.disconnect();
            }
        }


        private static HttpURLConnection connect(String apiUrl){
            try {
                URL url = new URL(apiUrl);
                return (HttpURLConnection)url.openConnection();
            } catch (MalformedURLException e) {
                throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
            } catch (IOException e) {
                throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
            }
        }


        private static String readBody(InputStream body){
            InputStreamReader streamReader = new InputStreamReader(body);

            try (BufferedReader lineReader = new BufferedReader(streamReader)) {
                StringBuilder responseBody = new StringBuilder();
                String line;
                while ((line = lineReader.readLine()) != null) {
                    responseBody.append(line);
                }
                return responseBody.toString();
            } catch (IOException e) {
                throw new RuntimeException("API 응답을 읽는 데 실패했습니다.", e);
            }
        }
    }
}
