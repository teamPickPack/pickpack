package com.pickpack.memberservice;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@Service
@Slf4j
public class NotificationService {


    private final String firebaseConfigPath = "/firebase/pickpack-68364-firebase-adminsdk-xmhtk-15ec15cc25.json";

    public void firebaseIntialize()  {

        try {
            FileInputStream serviceAccount =
                    new FileInputStream(firebaseConfigPath);

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
            log.info("firebase has been intialized");
        } catch (IOException e){
            log.error(e.getMessage());
        }



    }

}
