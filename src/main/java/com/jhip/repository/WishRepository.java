package com.jhip.repository;

import com.jhip.domain.Wish;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Wish entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {

}
