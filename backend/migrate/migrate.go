package main

import (
	"github.com/piotrd22/todo-app/backend/initializers"
	"github.com/piotrd22/todo-app/backend/models"
)

func init() {
	initializers.ConnectToDB()
	initializers.LoadEnvVariables()
}

func main() {
	initializers.DB.AutoMigrate(&models.Todo{})
}
