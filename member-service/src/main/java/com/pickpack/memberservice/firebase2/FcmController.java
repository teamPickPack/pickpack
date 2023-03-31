package com.pickpack.memberservice.firebase2;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@CrossOrigin("*")
public class FcmController {

    private final FirebaseCloudMessageService firebaseCloudMessageService;

    @CrossOrigin(origins = "*")
    @PostMapping("/fcm")
    public String pushMessage(@RequestBody RequestDto requestDto) throws IOException {

        System.out.println("🎈🎈🎈🎈🎈🎈🎈🎈");
        System.out.println(requestDto.getTargetToken() + " "
                + requestDto.getTitle() + " " + requestDto.getBody());

        firebaseCloudMessageService.sendMessageTo(
                requestDto.getTargetToken(),
                requestDto.getTitle(),
                requestDto.getBody());

//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Access-Control-Allow-Origin", "*");
//        return ResponseEntity.ok().headers(responseHeaders).body("success");

//        return new ResponseEntity("success", HttpStatus.OK);
        return "susadas";
    }

}
