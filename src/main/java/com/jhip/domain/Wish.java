package com.jhip.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A Wish.
 */
@Entity
@Table(name = "wish")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Wish implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "product_id", nullable = false)
    private Long productId;

    @DecimalMin(value = "0")
    @Column(name = "price", precision=10, scale=2)
    private BigDecimal price;

    private int priority;

    @ManyToOne
    private Wishlist wishlist;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public Wish productId(Long productId) {
        this.productId = productId;
        return this;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Wish price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Wishlist getWishlist() {
        return wishlist;
    }

    public Wish wishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
        return this;
    }

    public void setWishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Wish wish = (Wish) o;
        if (wish.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), wish.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Wish{" +
            "id=" + getId() +
            ", productId='" + getProductId() + "'" +
            ", price='" + getPrice() + "'" +
            "}";
    }
}
