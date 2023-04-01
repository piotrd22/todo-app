package models

import (
	"time"

	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model        // gorm.Model add us ID, CreatedAt, UpdatedAt, DeletedAt
	Name       string `gorm:"not null"`
	Text       string
	When       time.Time
}
