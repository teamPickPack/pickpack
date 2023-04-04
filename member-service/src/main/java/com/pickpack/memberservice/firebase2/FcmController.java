package com.pickpack.memberservice.firebase2;

import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class FcmController {

    private final FirebaseCloudMessageService firebaseCloudMessageService;

    @PostMapping("/fcm")
    public ResponseEntity<?> pushMessage(@RequestBody RequestDto requestDto) throws IOException, FirebaseMessagingException {

        System.out.println("🎈🎈🎈🎈🎈🎈🎈🎈");
        System.out.println(requestDto.getTargetToken() + " "
                + requestDto.getTitle() + " " + requestDto.getBody());

        firebaseCloudMessageService.sendMessageTo(
                requestDto.getTargetToken(),
                requestDto.getTitle(),
                requestDto.getBody());

        return ResponseEntity.ok().body("success");
//        return new ResponseEntity("success", HttpStatus.OK);

    }

}
