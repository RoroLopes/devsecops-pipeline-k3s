package handlers

import (
	"github.com/gin-gonic/gin"
	"api/database/models"
	"api/database"
	"fmt"
)

func RegisterRoutes(router *gin.Engine) {
	// Define your API routes here
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "healthy",
		})
	})

	router.POST("/api/auth/register", func(c *gin.Context) {
		body := &models.User{}
		if err := c.ShouldBindJSON(body); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
		} else {
			// Save the user to the database
			body = &models.User{
				Username: body.Username,
				Password: body.Password,
				Email:    body.Email,
			}
			database.InitDB().DB.Create(body)
		}
		c.JSON(200, gin.H{
			"message": "User registered successfully",
		})
	})
	router.POST("/api/auth/login", func(c *gin.Context) {
		body := &models.User{}
		var user models.User
		if err := c.ShouldBindJSON(body); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
		} else {
			query := fmt.Sprintf("SELECT * FROM users WHERE Email = '%s' AND Password = '%s'", body.Email, body.Password)
			result := database.InitDB().DB.Raw(query).First(&user)
			if result.Error != nil {
				c.JSON(401, gin.H{"error": result.Error.Error()})
				return
			}
		}
		c.JSON(200, gin.H{
			"message": "User logged in successfully",
			"user": user,
		})
	})
}