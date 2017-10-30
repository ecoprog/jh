package com.jhip.service;

import com.jhip.domain.Wish;
import com.jhip.repository.WishRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Wish.
 */
@Service
@Transactional
public class WishService {

    private final Logger log = LoggerFactory.getLogger(WishService.class);

    private final WishRepository wishRepository;

    public WishService(WishRepository wishRepository) {
        this.wishRepository = wishRepository;
    }

    /**
     * Save a wish.
     *
     * @param wish the entity to save
     * @return the persisted entity
     */
    public Wish save(Wish wish) {
        log.debug("Request to save Wish : {}", wish);
        return wishRepository.save(wish);
    }

    /**
     *  Get all the wishes.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Wish> findAll(Pageable pageable) {
        log.debug("Request to get all Wishes");
        return wishRepository.findAll(pageable);
    }

    /**
     *  Get one wish by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Wish findOne(Long id) {
        log.debug("Request to get Wish : {}", id);
        return wishRepository.findOne(id);
    }

    /**
     *  Delete the  wish by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Wish : {}", id);
        wishRepository.delete(id);
    }
}
