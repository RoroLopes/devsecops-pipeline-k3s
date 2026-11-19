package main

import (
	"api/handlers"
	"api/database"
	"github.com/gin-gonic/gin"
	"api/database/models"
)

func main() {
	db := database.InitDB()
	models.Migrate(db.DB)
	router := gin.Default()
	handlers.RegisterRoutes(router)
	router.Run()
}