package controller

import (
	"github.com/Szeenom/sa-65-felix/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Furniture
func CreateFurniture(c *gin.Context) {
	var Furniture entity.Furniture
	if err := c.ShouldBindJSON(&Furniture); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Furniture).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": Furniture})
}

// GET /Furniture/:id
func GetFurniture(c *gin.Context) {
	var Furniture entity.Furniture
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&Furniture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Furniture not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Furniture})
}

// GET /Furnitures
func ListFurnitures(c *gin.Context) {
	var Furnitures []entity.Furniture
	if err := entity.DB().Raw("SELECT * FROM Furnitures").Scan(&Furnitures).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Furnitures})
}

// DELETE /Furnitures/:id
func DeleteFurniture(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Furnitures WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Furniture not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Furnitures
func UpdateFurniture(c *gin.Context) {
	var Furniture entity.Furniture
	if err := c.ShouldBindJSON(&Furniture); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Furniture.ID).First(&Furniture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	if err := entity.DB().Save(&Furniture).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Furniture})
}
