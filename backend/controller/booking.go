package controller

import (
	"github.com/Szeenom/sa-65-felix/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /users

func CreateBooking(c *gin.Context) {

	var booking entity.Booking
	var room entity.Room
	var time entity.Time
	var student entity.Student

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร watchVideo
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา video ด้วย id
	if tx := entity.DB().Where("id = ?", booking.Room_id).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	// 10: ค้นหา resolution ด้วย id
	if tx := entity.DB().Where("id = ?", booking.TimeID).First(&time); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", booking.STUDENT_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "playlist not found"})
		return
	}
	// 12: สร้าง WatchVideo
	bk := entity.Booking{
		Room:          room,    // โยงความสัมพันธ์กับ Entity Room
		Time:          time,    // โยงความสัมพันธ์กับ Entity Rime
		Student:       student, // โยงความสัมพันธ์กับ Entity Student
		Check_in_date: booking.Check_in_date,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": bk})
}

// GET /Booking/:id

func GetBooking(c *gin.Context) {

	var booking entity.Booking

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM bookings WHERE id = ?", id).Scan(&booking).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": booking})

}

// GET /users

func ListBookings(c *gin.Context) {
	var booking []entity.Booking
	if err := entity.DB().Preload("Room").Preload("Student").Preload("Time").Raw("SELECT * FROM bookings").Find(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": booking})
}

// DELETE /users/:id

func DeleteBooking(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM bookings WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateBooking(c *gin.Context) {

	var booking entity.Booking

	if err := c.ShouldBindJSON(&booking); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", booking.ID).First(&booking); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&booking).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": booking})

}
