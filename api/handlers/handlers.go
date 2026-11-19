package handlers

import "github.com/gin-gonic/gin"
import "api/database/models"
import "api/database"

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
		if err := c.ShouldBindJSON(body); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
		} else {
			// Check if the user exists in the database
			var user models.User
			result := database.InitDB().DB.Where("email = ? AND password = ?", body.Email, body.Password).First(&user)
			if result.Error != nil {
				c.JSON(401, gin.H{"error": "Invalid email or password"})
				return
			}
		}
		c.JSON(200, gin.H{
			"message": "User logged in successfully",
		})
	})
}