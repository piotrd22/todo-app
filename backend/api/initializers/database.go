package initializers

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error
	HOST := os.Getenv("DB_HOST")
	USER := os.Getenv("DB_USER")
	PORT := os.Getenv("DB_PORT")
	NAME := os.Getenv("DB_NAME")
	PASSWORD := os.Getenv("DB_PASSWORD")

	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v sslmode=disable TimeZone=Asia/Shanghai", HOST, USER, PASSWORD, NAME, PORT)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect")
	}
}
