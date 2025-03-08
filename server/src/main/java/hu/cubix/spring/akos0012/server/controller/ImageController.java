package hu.cubix.spring.akos0012.server.controller;

import hu.cubix.spring.akos0012.server.dto.image.ImageResponseDTO;
import hu.cubix.spring.akos0012.server.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> findById(@PathVariable Long id) {
        ImageResponseDTO imageDto = imageService.findById(id);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(imageDto.type()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageDto.name() + "\"")
                .body(imageDto.data());
    }
}
