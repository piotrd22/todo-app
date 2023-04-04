package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/piotrd22/todo-app/backend/api/controllers"
	"github.com/piotrd22/todo-app/backend/api/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}

	r.Use(cors.New(config))

	r.POST("/api/todo", controllers.CreateTodo)
	r.GET("/api/todo", controllers.GetTodos)
	r.DELETE("/api/todo/:id", controllers.DeleteTodo)
	r.PUT("/api/todo/:id", controllers.UpdateTodo)

	err := r.Run()
	if err != nil {
		return
	}
}
