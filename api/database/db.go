package database

import (
	"fmt"
	"sync"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var lock = &sync.Mutex{}

type Database struct {
	DB *gorm.DB
}

var instance *Database

func InitDB() *Database {
	if instance == nil {
		lock.Lock()
		defer lock.Unlock()
		if instance == nil {
			fmt.Println("Creating new database instance")
			gormDB, err := gorm.Open(postgres.Open("host=localhost user=devsecops_admin password=devsecops_admin! dbname=devsecops_project port=5432 sslmode=disable"), &gorm.Config{})
			if err != nil {
				panic("failed to connect database")
			}
			instance = &Database{DB: gormDB}
		}
	}
	fmt.Println("Returning existing database instance")
	return instance
}
