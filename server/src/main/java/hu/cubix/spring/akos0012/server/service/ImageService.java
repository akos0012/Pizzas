package hu.cubix.spring.akos0012.server.service;

import hu.cubix.spring.akos0012.server.dto.image.ImageResponseDTO;
import hu.cubix.spring.akos0012.server.mapper.ImageMapper;
import hu.cubix.spring.akos0012.server.model.Image;
import hu.cubix.spring.akos0012.server.repository.ImageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    public ImageService(ImageRepository imageRepository, ImageMapper imageMapper) {
        this.imageRepository = imageRepository;
        this.imageMapper = imageMapper;
    }

    public ImageResponseDTO findById(Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Image not found with ID: " + id));
        return imageMapper.imageToResponseDto(image);
    }

    public Image storeImage(MultipartFile file) {
        try {
            Image image = new Image();
            image.setName(file.getOriginalFilename());
            image.setType(file.getContentType());
            image.setData(file.getBytes());
            return imageRepository.save(image);
        } catch (IOException e) {
            throw new RuntimeException("Error storing image", e);
        }
    }

}
