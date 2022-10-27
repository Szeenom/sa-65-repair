package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("booking.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&User{},
		&Time{},
		&Gender{},
		&Role{},
		&Program{},
		&Room_type{},
		&Room_price{},
		&Furniture{},
		&Set_of_furniture{},
		&Semester{},
		&Job_Position{},
		&Province{},
		&Equipment{},
		&Borrowcard{},
		&Employee{},
		&Student{},
		&Room{},
		&Booking{},
		&ListData{},
		&Payment_Bill{},
		&Repair{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&Student{}).Create(&Student{
		STUDENT_NUMBER: "B611308",
		Password:       string(password),
	})
	db.Model(&Student{}).Create(&Student{
		STUDENT_NUMBER: "B6428853",
		STUDENT_NAME:   "SriSuk Malee",
		PERSONAL_ID:    1234569875159,
		Password:       string(password),
	})

	var chanwit User
	var name User
	db.Raw("SELECT * FROM users WHERE email = ?", "tanapon@gmail.com").Scan(&chanwit)
	db.Raw("SELECT * FROM users WHERE email = ?", "name@example.com").Scan(&name)

	var phanukorn Student
	db.Raw("SELECT * FROM students WHERE STUDENT_NUMBER = ?", "B6311308").Scan(&phanukorn)

	T1 := Time{
		Time_number: "1 เทอม",
	}
	db.Model(&Time{}).Create(&T1)
	T2 := Time{
		Time_number: "2 เทอม",
	}
	db.Model(&Time{}).Create(&T2)
	T3 := Time{
		Time_number: "1 ปี",
	}
	db.Model(&Time{}).Create(&T3)
	T4 := Time{
		Time_number: "1 ปี 1 เทอม",
	}
	db.Model(&Time{}).Create(&T4)

	Room1 := Room{}
	db.Model(&Room{}).Create(&Room1)
	Room2 := Room{}
	db.Model(&Room{}).Create(&Room2)
	Room3 := Room{}
	db.Model(&Room{}).Create(&Room3)

	var target User
	db.Model(&User{}).Find(&target, db.Where("email = ?", "tanapon@gmail.com"))

	type1 := Room_type{
		Room_type_name: "Single",
	}
	db.Model(&Room_type{}).Create(&type1)

	type2 := Room_type{
		Room_type_name: "Twin",
	}

	db.Model(&Room_type{}).Create(&type2)

	//Resolution Data
	price1 := Room_price{
		Price: "3000",
	}
	db.Model(&Room_price{}).Create(&price1)

	price2 := Room_price{
		Price: "5000",
	}
	db.Model(&Room_price{}).Create(&price2)

	//set_of
	set1 := Set_of_furniture{
		Set_of_furniture_title: "Set1",
	}
	db.Model(&Set_of_furniture{}).Create(&set1)

	// === Query

	db.Model(&Room{}).Create(&Room{
		Room_type:        type1,
		Room_price:       price1,
		Set_of_furniture: set1,
	})

	db.Model(&Room{}).Create(&Room{
		Room_type:        type1,
		Room_price:       price1,
		Set_of_furniture: set1,
	})
	db.Model(&Room{}).Create(&Room{
		Room_type:        type1,
		Room_price:       price1,
		Set_of_furniture: set1,
	})
	db.Model(&Room{}).Create(&Room{
		Room_type:        type1,
		Room_price:       price1,
		Set_of_furniture: set1,
	})
	db.Model(&Room{}).Create(&Room{
		Room_type:        type1,
		Room_price:       price1,
		Set_of_furniture: set1,
	})
	db.Model(&Furniture{}).Create(&Furniture{
		Furniture_type: "Fan",
	})
}
