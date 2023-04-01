package main

import (
	"github.com/piotrd22/todo-app/backend/api/initializers"
	"github.com/piotrd22/todo-app/backend/api/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Todo{})
}
