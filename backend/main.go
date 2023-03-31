package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// func init() {
// 	initializers.LoadEnvVariables()
// 	initializers.ConnectToDB()
// }

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
	}))

	r.Run()
}
