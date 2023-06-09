package main

import (
	"time"

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

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/api/todo", controllers.CreateTodo)
	r.GET("/api/todo", controllers.GetTodos)
	r.DELETE("/api/todo/:id", controllers.DeleteTodo)
	r.PUT("/api/todo/:id", controllers.UpdateTodo)

	err := r.Run()
	if err != nil {
		return
	}
}
