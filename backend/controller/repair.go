package controller

import (
	"github.com/Szeenom/sa-65-felix/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /users

func CreateRepair(c *gin.Context) {

	var repair entity.Repair
	var room entity.Room
	var furniture entity.Furniture
	var student entity.Student

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร repair
	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", repair.Room_id).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// 10: ค้นหา furniture ด้วย id
	if tx := entity.DB().Where("id = ?", repair.Furniture_id).First(&furniture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "furniture not found"})
		return
	}

	// 11: ค้นหา student ด้วย id
	if tx := entity.DB().Where("id = ?", repair.STUDENT_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}
	// // 12: สร้าง Repair
	bk := entity.Repair{
		Comment:   repair.Comment,
		Room:      room,      // โยงความสัมพันธ์กับ Entity Room
		Furniture: furniture, // โยงความสัมพันธ์กับ Entity Furniture
		Student:   student,   // โยงความสัมพันธ์กับ Entity Student
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": bk})
}

// GET /Repair/:id

func GetRepair(c *gin.Context) {

	var Repair entity.Repair

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Repairs WHERE id = ?", id).Scan(&Repair).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Repair})

}

// GET /users

func ListRepairs(c *gin.Context) {
	var Repair []entity.Repair
	if err := entity.DB().Preload("Room").Preload("Student").Preload("Furniture").Raw("SELECT * FROM Repairs").Find(&Repair).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Repair})
}

// DELETE /users/:id

// PATCH /users
