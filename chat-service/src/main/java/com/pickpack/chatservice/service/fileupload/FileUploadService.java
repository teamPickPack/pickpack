//package com.pickpack.chatservice.service.fileupload;
//
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.pickpack.chatservice.dto.FileDto;
//import com.pickpack.chatservice.vo.FileVO;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.ByteArrayInputStream;
//import java.time.LocalDateTime;
//import java.util.Base64;
//import java.util.UUID;
//
///**
//전달받은 파일을 S3에 저장하고 S3에 저장된 파일의 URL을 담은 FileVO 객체를 반환하는 기능이다.
// */
//@Slf4j
//@RequiredArgsConstructor
//@Transactional
//@Service
//public class FileUploadService {
//
//    private final AmazonS3 amazonS3;
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;
//
//    public String fileUpLoad(FileDto fileDto) {
//        log.info("fileservice에 file 왔나:{} ", fileDto.getName());
//
//        //TODO file 크기 판단 logic 필요
//        log.info(String.valueOf(fileDto.getSize()));
//        String imgUrl="";
//        try {
//            byte[] decodedData = Base64.getDecoder().decode(fileDto.getData().split(",")[1]);
//            String originalName = fileDto.getName();
//            String savedName = UUID.randomUUID() + "-" + originalName;
//
//            //파일 크기와 컨텐츠 타입을 저장할 ObjectMetadata 객체를 생성한다.
//            ObjectMetadata metadata = new ObjectMetadata();
//            metadata.setContentLength(fileDto.getSize());
//            metadata.setContentType(fileDto.getType());
//
//            // 파일을 s3에 저장하고 s3 URL을 FileVO 객체에 저장한다.
//            amazonS3.putObject(bucket, savedName, new ByteArrayInputStream(decodedData), metadata);
//
////            fileVO = FileVO.builder()
////                    .imgOriginalName(originalName)
////                    .imgNewName(savedName)
////                    .imgPath(amazonS3.getUrl(bucket, savedName).toString())
////                    .imgUploadTime(LocalDateTime.now()).build();
//
//            log.info("확인해봐 : "+ amazonS3.getUrl(bucket,savedName).toString());
//            imgUrl=amazonS3.getUrl(bucket,savedName).toString();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return imgUrl;
//    }
//}