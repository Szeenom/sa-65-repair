package main

import (
	"github.com/Szeenom/sa-65-felix/controller"
	"github.com/Szeenom/sa-65-felix/middlewares"

	"github.com/Szeenom/sa-65-felix/entity"

	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{

			// User

			r.GET("/Bookings", controller.ListBookings)

			r.GET("/Booking/:id", controller.GetBooking)

			r.POST("/Bookings", controller.CreateBooking)

			r.PATCH("/Bookings", controller.UpdateBooking)

			r.DELETE("/Bookings/:id", controller.DeleteBooking)
			///
			r.GET("/Rooms", controller.ListRooms)

			r.GET("/Room/:id", controller.GetRoom)

			r.POST("/Rooms", controller.CreateRoom)

			r.PATCH("/Rooms", controller.UpdateRoom)

			r.DELETE("/Rooms/:id", controller.DeleteRoom)

			///
			r.GET("/Times", controller.ListTimes)

			r.GET("/Time/:id", controller.GetTime)

			r.POST("/Times", controller.CreateTime)

			r.PATCH("/Times", controller.UpdateTime)

			r.DELETE("/Times/:id", controller.DeleteTime)

			///
			r.GET("/Students", controller.ListStudents)

			r.GET("/Student/:id", controller.GetStudent)

			r.POST("/Students", controller.CreateStudent)

			r.PATCH("/Students", controller.UpdateStudent)

			r.DELETE("/Students/:id", controller.DeleteStudent)

			// Run the server

			//repair
			r.GET("/Repairs", controller.ListRepairs)

			r.GET("/Repair/:id", controller.GetRepair)

			r.POST("/Repairs", controller.CreateRepair)

			//Furniture

			r.GET("/Furnitures", controller.ListFurnitures)

			r.GET("/Furniture/:id", controller.GetFurniture)

			r.POST("/Furnitures", controller.CreateFurniture)

			r.PATCH("/Furnitures", controller.UpdateFurniture)

			r.DELETE("/Furnitures/:id", controller.DeleteFurniture)
		}

	}
	// Signup User Route
	r.POST("/signup", controller.CreateUser)
	// login User Route
	r.POST("/login", controller.Login)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
