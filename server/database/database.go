package database

import (
	"errors"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/tkmpypy/grpc-sample-client-golang/server/model"
	"xorm.io/xorm"
)

type DB struct {
	orm xorm.EngineInterface
}

func createDSN(username, password, host, port, dbname string) string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=true",
		username,
		password,
		host,
		port,
		dbname,
	)
}

func New(username, password, host, port, dbname string) (*DB, error) {
	orm, err := xorm.NewEngine("mysql", createDSN(username, password, host, port, dbname))
	if err != nil {
		return nil, err
	}
	return &DB{
		orm: orm,
	}, nil
}


func (d *DB) Migrate() error {
	return d.orm.Sync2(new(model.Todo))
}

func (d *DB) GetByIDTodo(id int64) (*model.Todo, error) {
	var t = &model.Todo {
		Id: id,
	}
	has, err := d.orm.Get(t)
	if err != nil {
		return nil, err
	}
	if !has {
		return nil, nil
	}
	return t, nil
}

func (d *DB) FindAllTodo() (*[]model.Todo, error) {
	var todos []model.Todo
	if err := d.orm.Find(&todos); err != nil {
		return nil, err
	}
	return &todos, nil
}

func (d *DB) FindAllByDoneTodo(done bool) (*[]model.Todo, error) {
	var todos []model.Todo
	if err := d.orm.Where("done = ?", done).Find(&todos); err != nil {
		return nil, err
	}
	return &todos, nil
}

func (d *DB) AddTodo(m model.Todo) error {
	if _, err := d.orm.InsertOne(m); err != nil {
		return err
	}
	return nil
}

func (d *DB) UpdateTodo(m model.Todo) error {
	affected, err := d.orm.UseBool().ID(m.Id).Update(&m)
	if err != nil {
		return err
	}
	if affected == 0 {
		return errors.New("not found")
	}
	return nil
}
