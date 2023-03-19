
import com.google.gson.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;


public class GooglePlaceAPI {
    static final String APIKEY = "AIzaSyBfZy9M7rOgL0CpT9VdROmNKKLqP4br1uU"; // api key
    static final int RADIUS=500000;
    static final String LANG = "ko";
    static final String TYPE = "tourist_attraction";
    public static void main(String[] args) throws Exception{
        // 체코 위도 경도
        Double lat = 50.0833;
        Double lon = 14.4166;
        String city = "체코";
        String result = getPlace(lat, lon, city);
        System.out.println("----------------- getPlace 결과 --------------------");


        // gson으로 json 문자열 to Map
        Gson gson = new Gson();

        JsonElement jsonElement = JsonParser.parseString(result);
        JsonObject jsonObject = jsonElement.getAsJsonObject();

        JsonArray jsonArray = jsonObject.getAsJsonArray("results");
        Place[] places = gson.fromJson(jsonArray, Place[].class);
        for (int i = 0; i < places.length; i++) {
            String pLat = places[i].geometry.location.lat;
            String pLng = places[i].geometry.location.lng;
            String pPhotoReference = getPhotoReference(places[i].photos.get(0).toString());
            getPhoto(pPhotoReference, i);
        }
        //getPhoto(photo_reference);
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

    static void getPhoto(String photoReference, int i) throws Exception{
        StringBuilder apiURL = new StringBuilder();
        apiURL.append("https://maps.googleapis.com/maps/api/place/photo?maxwidth=700");
        apiURL.append("&photo_reference=").append(photoReference);
        apiURL.append("&key=").append(APIKEY);
        URL url = new URL(apiURL.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setDoInput(true);
        InputStream inputStream = conn.getInputStream();
        FileOutputStream fileOutputStream = new FileOutputStream("photo"+i+".jpg");
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

    static String timeValue(String unixTime){
        long timestamp = Long.parseLong(unixTime);
        SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        Date date = new Date();
        date.setTime(timestamp);

        String Datetime = sdf.format(date);
        return Datetime;
    }
}