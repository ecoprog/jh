package com.jhip.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jhip.domain.User;
import com.jhip.domain.Wishlist;

import com.jhip.repository.UserRepository;
import com.jhip.repository.WishlistRepository;
import com.jhip.service.UserService;
import com.jhip.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.hibernate.service.spi.InjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Wishlist.
 */
@RestController
@RequestMapping("/api")
public class WishlistResource {

    private final Logger log = LoggerFactory.getLogger(WishlistResource.class);

    private static final String ENTITY_NAME = "wishlist";

    private final WishlistRepository wishlistRepository;

    private final UserService userService;

    public WishlistResource(WishlistRepository wishlistRepository, UserService userService) {

        this.wishlistRepository = wishlistRepository;
        this.userService = userService;
    }

    /**
     * POST  /wishlists : Create a new wishlist.
     *
     * @param wishlist the wishlist to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wishlist, or with status 400 (Bad Request) if the wishlist has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/wishlists")
    @Timed
    public ResponseEntity<Wishlist> createWishlist(@RequestBody Wishlist wishlist) throws URISyntaxException {
        log.debug("REST request to save Wishlist : {}", wishlist);
        if (wishlist.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new wishlist cannot already have an ID")).body(null);
        }
        // Added something
        Wishlist result = wishlistRepository.save(wishlist.
            user(userService.getUserWithAuthorities()).
            creationDate(LocalDate.now()));
        return ResponseEntity.created(new URI("/api/wishlists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wishlists : Updates an existing wishlist.
     *
     * @param wishlist the wishlist to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wishlist,
     * or with status 400 (Bad Request) if the wishlist is not valid,
     * or with status 500 (Internal Server Error) if the wishlist couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/wishlists")
    @Timed
    public ResponseEntity<Wishlist> updateWishlist(@RequestBody Wishlist wishlist) throws URISyntaxException {
        log.debug("REST request to update Wishlist : {}", wishlist);
        if (wishlist.getId() == null) {
            return createWishlist(wishlist);
        }
        Wishlist result = wishlistRepository.save(wishlist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wishlist.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wishlists : get all the wishlists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of wishlists in body
     */
    @GetMapping("/wishlists")
    @Timed
    public List<Wishlist> getAllWishlists() {
        // Added something
        log.debug("REST request to get all Wishlists");
        return wishlistRepository.findByUserIsCurrentUser();
        }

    /**
     * GET  /wishlists/:id : get the "id" wishlist.
     *
     * @param id the id of the wishlist to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wishlist, or with status 404 (Not Found)
     */
    @GetMapping("/wishlists/{id}")
    @Timed
    public ResponseEntity<Wishlist> getWishlist(@PathVariable Long id) {
        log.debug("REST request to get Wishlist : {}", id);
        Wishlist wishlist = wishlistRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(wishlist));
    }

    /**
     * DELETE  /wishlists/:id : delete the "id" wishlist.
     *
     * @param id the id of the wishlist to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/wishlists/{id}")
    @Timed
    public ResponseEntity<Void> deleteWishlist(@PathVariable Long id) {
        log.debug("REST request to delete Wishlist : {}", id);
        wishlistRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
