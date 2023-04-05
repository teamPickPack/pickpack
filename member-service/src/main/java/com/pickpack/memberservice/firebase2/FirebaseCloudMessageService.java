package com.pickpack.memberservice.firebase2;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.net.HttpHeaders;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class FirebaseCloudMessageService {

//    private final String API_URL = "https://fcm.googleapis.com/v1/projects/pickpack-68364/messages:send";
    private final ObjectMapper objectMapper;


    public void sendMessageTo(String targetToken, String title, String body) throws IOException, FirebaseMessagingException {
//        String message = makeMessage(targetToken, title, body);

        log.info("메세지 전송 전");
//        OkHttpClient client = new OkHttpClient();
//        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
//        Request request = new Request.Builder()
//                .url(API_URL)
//                .post(requestBody)
//                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
//                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
//                .build();

        Message mes = Message.builder()
                        .putData("name", "hs")
                        .putData("age", "12")
                        .setToken(targetToken)
                        .build();

        log.info("바디" + mes);


//        try{
//            Thread.sleep(10000);
//        }catch(InterruptedException e){
//            e.printStackTrace();
//        }

        String send = FirebaseMessaging.getInstance().send(mes);
        System.out.println("🎄" + send);
//        Response response = client.newCall(request).execute();

//        System.out.println(response.body().string());
    }

    private String makeMessage(String targetToken, String title, String body) throws JsonProcessingException {
        
        log.info("메세지 만들기");
        
        FcmMessage fcmMessage = FcmMessage.builder()
                .message(FcmMessage.Message.builder()
                        .token(targetToken)
                        .notification(FcmMessage.Notification.builder()
                                .title(title)
                                .body(body)
                                .image(null)
                                .build()
                        )
                        .build()
                )
                .validate_only(false)
                .build();

        log.info("메세지 생성 완료.");

        return objectMapper.writeValueAsString(fcmMessage);
    }

    private String getAccessToken() throws IOException {
        
        log.info("토큰 받아오기");

        String firebaseConfigPath = "firebase/pickpack-68364-firebase-adminsdk-xmhtk-15ec15cc25.json";

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        googleCredentials.refreshIfExpired();
//        System.out.println(googleCredentials.getAccessToken().getTokenValue());

        log.info("토큰 생성 완료");
        System.out.println(googleCredentials);
        System.out.println(googleCredentials.getAccessToken().getTokenValue());

        return googleCredentials.getAccessToken().getTokenValue();

    }

}
