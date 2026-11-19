package models

import (
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	if db != nil {
		db.AutoMigrate(&User{})
	}
}