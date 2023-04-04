package com.pickpack.memberservice.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.querydsl.core.annotations.Config;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Configuration
public class FCMConfig {

    @PostConstruct
    public void initialize() throws IOException {
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(new ClassPathResource("firebase/pickpack-68364-firebase-adminsdk-xmhtk-15ec15cc25.json").getInputStream()))
                .setDatabaseUrl("https://pickpack-68364-default-rtdb.firebaseio.com/")
                .build();

        if (FirebaseApp.getApps().isEmpty())	FirebaseApp.initializeApp(options);
    }

}
