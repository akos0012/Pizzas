package hu.cubix.spring.akos0012.server.service;

import hu.cubix.spring.akos0012.server.dto.allergen.AllergenCreateDTO;
import hu.cubix.spring.akos0012.server.dto.allergen.AllergenResponseDTO;
import hu.cubix.spring.akos0012.server.mapper.AllergenMapper;
import hu.cubix.spring.akos0012.server.model.Allergen;
import hu.cubix.spring.akos0012.server.repository.AllergenRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AllergenService {

    @Autowired
    private AllergenRepository allergenRepository;

    @Autowired
    private AllergenMapper allergenMapper;

    public Allergen save(Allergen allergen) {
        return allergenRepository.save(allergen);
    }

    public List<AllergenResponseDTO> findAll() {
        return allergenMapper.allergensToResponseDTOs(allergenRepository.findAll());
    }

    public AllergenResponseDTO findById(Long id) {
        Allergen allergen = allergenRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Allergen not found with ID: " + id));
        return allergenMapper.allergenResponseToDto(allergen);
    }

    public AllergenResponseDTO createAllergen(AllergenCreateDTO allergenDTO) {
        Allergen newAllergen = allergenMapper.createDtoToAllergen(allergenDTO);
        return allergenMapper.allergenResponseToDto(allergenRepository.save(newAllergen));
    }

    @Transactional
    public void delete(long id) {
        allergenRepository.deleteById(id);
    }
}
