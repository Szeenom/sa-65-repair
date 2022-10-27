package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string `json:"-"`
}

// ระบบจองห้อง
type Time struct {
	gorm.Model
	Time_number string
	Booking     []Booking `gorm:"foreignKey:TimeID"`
}

// /ระบบจัดการนักศึกษา

type Gender struct {
	gorm.Model
	GENDER_NAME string
	// 1 เพศต่อ 1 student
	Students  []Student  `gorm:"foreignKey:GenderID"`
	Employees []Employee `gorm:"foreignKey:GenderID"`
}

type Role struct {
	gorm.Model
	Role_name string
	Students  []Student `gorm:"foreignKey:RoleID"`
}
type Program struct {
	gorm.Model
	Program_name string
	Students     []Student `gorm:"foreignKey:ProgramID"`
}

///ระบบจัดการห้อง

type Room_type struct {
	gorm.Model
	Room_type_name string

	Room []Room `gorm:"foreignKey:Room_type_id"`
}
type Room_price struct {
	gorm.Model
	Price string

	Room []Room `gorm:"foreignKey:Room_price_id"`
}
type Furniture struct {
	gorm.Model
	Furniture_type      string
	Set_of_furniture_id *uint
	Set_of_furniture    Set_of_furniture `gorm:"refernces:id"`
	Repair              []Repair         `gorm:"foreignKey:Furniture_id"`
}
type Set_of_furniture struct {
	gorm.Model
	Set_of_furniture_title string

	Furniture []Furniture `gorm:"foreignKey:Set_of_furniture_id"`
	Room      []Room      `gorm:"foreignKey:Set_of_furniture_id"`
}

// ระบบชำระเงิน
// -------------------------------------------------------------------------------------------------
// entity Room_Price สร้างเพื่อทดสอบการคำนวณ

// entity Room, Student สร้างเพื่อทดสอบ foreign key
// -------------------------------------------------------------------------------------------------
type Semester struct {
	gorm.Model

	Semester     string
	Payment_Bill []Payment_Bill `gorm:"foreignKey:SemesterID"`
}

// ระบบพนักงาน
type Job_Position struct {
	gorm.Model
	Name string

	Employees []Employee `gorm:"foreignKey:Job_PositionID"`
}

type Province struct {
	gorm.Model
	Name string

	Employees []Employee `gorm:"foreignKey:ProvinceID"`
	Students  []Student  `gorm:"foreignKey:ProvinceID"`
}

// ยืมของ
type Equipment struct { //Video
	gorm.Model
	EquipmentName string
	EquipmentCode string `gorm:"uniqueIndex"`
	// BorrowerID ทำหน้าที่เป็น FK
	BorrowerID uint
	ListData   []ListData `gorm:"foreignKey:EquipmentID"`
}

type Borrowcard struct { //Playlist
	gorm.Model
	// BorrowerID ทำหน้าที่เป็น FK
	BorrowerID uint

	ListData []ListData `gorm:"foreignKey:BorrowcardID"`
}

type Employee struct {
	gorm.Model
	Personal_ID string `gorm:"uniqueIndex"`
	Email       string `gorm:"uniqueIndex"`
	Name        string
	Password    string

	//GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	//Job_PositionID ทำหน้าที่เป็น FK
	Job_PositionID *uint
	Job_Position   Job_Position `gorm:"references:id"`

	//ProvinceID ทำหน้าที่เป็น FK
	ProvinceID *uint
	Province   Province `gorm:"references:id"`

	Students     []Student      `gorm:"foreignKey:EmployeeID"`
	Payment_Bill []Payment_Bill `gorm:"foreignKey:EmployeeID"`
}

type Student struct {
	gorm.Model
	STUDENT_NUMBER string `gorm:"uniqueIndex"`
	STUDENT_NAME   string
	PERSONAL_ID    uint
	Password       string
	//
	GenderID *uint
	Gender   Gender
	//
	ProvinceID *uint
	Province   Province
	//
	ProgramID *uint
	Program   Program
	//
	RoleID *uint
	Role   Role
	//
	EmployeeID *uint
	Employee   Employee
	Booking    []Booking `gorm:"foreignKey:STUDENT_ID"`
	Repair     []Repair  `gorm:"foreignKey:STUDENT_ID"`
}

type Room struct {
	gorm.Model
	Room_type_id *uint
	Room_type    Room_type `gorm:"refernces:id"`

	Room_price_id *uint
	Room_price    Room_price `gorm:"refernces:id"`

	Set_of_furniture_id *uint
	Set_of_furniture    Set_of_furniture `gorm:"refernces:id"`

	Booking  []Booking  `gorm:"foreignKey:Room_id"`
	Repair   []Repair   `gorm:"foreignKey:Room_id"`
	ListData []ListData `gorm:"foreignKey:Room_id"`
}

type Booking struct {
	gorm.Model

	Check_in_date time.Time
	Room_id       *uint
	Room          Room `gorm:"references:id"`
	STUDENT_ID    *uint
	Student       Student `gorm:"references:id"`
	TimeID        *uint
	Time          Time `gorm:"references:id"`

	Payment_Bill []Payment_Bill `gorm:"foreignKey:BookingID"`
}

type ListData struct {
	gorm.Model
	BorrowTime time.Time

	ReturnTime time.Time

	// BorrowCardID ทำหน้าที่เป็น FK
	BorrowcardID uint
	Borrowcard   Borrowcard `gorm:"references:id"`

	// EquipmentID ทำหน้าที่เป็น FK
	EquipmentID uint
	Equipment   Equipment `gorm:"references:id"`

	// RoomID ทำหน้าที่เป็น FK
	Room_id *uint
	Room    Room `gorm:"references:id"`
}

type Payment_Bill struct {
	gorm.Model
	Billing_Date    time.Time
	Electric_Bill   float32
	Water_Bill      float32
	Payment_Balance float32

	// Employee ทำหน้าที่เป็น FK
	EmployeeID int
	Employee   Employee `gorm:"references:id"`

	// BookingID ทำหน้าที่เป็น FK
	BookingID int
	Booking   Booking `gorm:"references:id"`

	// Semester ทำหน้าที่เป็น FK
	SemesterID int
	Semester   Semester `gorm:"references:id"`
}

// /ระบบแจ้งซ่อม
// Repair
type Repair struct {
	gorm.Model
	Comment      string
	STUDENT_ID   *uint
	Student      Student `gorm:"refernces:STUDENT_ID"`
	Room_id      *uint
	Room         Room `gorm:"refernces:Room_id"`
	Furniture_id *uint
	Furniture    Furniture `gorm:"refernces:furniture_id"`
}
