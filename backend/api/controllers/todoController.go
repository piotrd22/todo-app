package controllers

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/piotrd22/todo-app/backend/api/initializers"
	"github.com/piotrd22/todo-app/backend/api/models"
)

func GetTodos(c *gin.Context) {
	var todos []models.Todo
	result := initializers.DB.Find(&todos)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"todos": todos,
	})
}

func CreateTodo(c *gin.Context) {

	var body struct {
		Name string    `json:"name" binding:"required"`
		Text string    `json:"text"`
		When time.Time `json:"when"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.AbortWithStatusJSON(400,
			gin.H{
				"error":   "VALIDATEERR-1",
				"message": "Invalid inputs. Please check your inputs"})
		return
	}

	todo := models.Todo{Name: body.Name, Text: body.Text, When: body.When}

	result := initializers.DB.Create(&todo)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, todo)
}

func DeleteTodo(c *gin.Context) {
	id := c.Param("id")

	var todo models.Todo
	check := initializers.DB.Find(&todo, id)

	if check.Error != nil || check == nil {
		c.Status(400)
		return
	}

	result := initializers.DB.Unscoped().Delete(&todo, id)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, "Todo has been deleted")
}

func UpdateTodo(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		Name string    `json:"name"`
		Text string    `json:"text"`
		When time.Time `json:"when"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.AbortWithStatusJSON(400,
			gin.H{
				"error":   "VALIDATEERR-1",
				"message": "Invalid inputs. Please check your inputs"})
		return
	}

	var todo models.Todo
	result := initializers.DB.First(&todo, id)

	if result.Error != nil || result == nil {
		c.Status(400)
		return
	}

	initializers.DB.First(&todo, id).Updates(models.Todo{Name: body.Name, Text: body.Text, When: body.When})

	c.JSON(200, todo)
}
