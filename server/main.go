package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net"
	"os"

	"github.com/tkmpypy/grpc-sample-client-golang/server/database"
	todov1 "github.com/tkmpypy/grpc-sample-client-golang/server/gen/golang/proto/todoapis/todo/v1"
	"github.com/tkmpypy/grpc-sample-client-golang/server/model"
	"google.golang.org/grpc"
)

var (
	appPort    string = os.Getenv("APP_PORT")
	dbUser     string = os.Getenv("DB_USER")
	dbPort     string = os.Getenv("DB_PORT")
	dbHost     string = os.Getenv("DB_HOST")
	dbName     string = os.Getenv("DB_NAME")
	dbPassword string = os.Getenv("DB_PASSWORD")
)

type todoServer struct {
	todov1.UnimplementedTodoServiceServer
	db *database.DB
}

func newServer(db *database.DB) *todoServer {
	s := &todoServer{
		db: db,
	}
	return s
}

func (s *todoServer) GetTodo(ctx context.Context, r *todov1.GetTodoRequest) (*todov1.GetTodoResponse, error) {
	log.Printf("%v\n", r)
	todo, err := s.db.GetByIDTodo(r.GetTodoId())
	if err != nil {
		return nil, err
	}

	m, err := todo.ConvertGRPCModel()
	if err != nil {
		return nil, err
	}
	return &todov1.GetTodoResponse{
		Todo: m,
	}, nil
}

func (s *todoServer) GetTodos(ctx context.Context, r *todov1.GetTodosRequest) (*todov1.GetTodosResponse, error) {
	log.Printf("%v\n", r)
	var todos *[]model.Todo
	var err error
	if r.Done != nil {
		todos, err = s.db.FindAllByDoneTodo(r.GetDone())
	} else {
		todos, err = s.db.FindAllTodo()
	}
	if err != nil {
		log.Fatalln(err)
		return nil, err
	}

	var t []*todov1.Todo
	var convertErr error = nil
	for _, v := range *todos {
		m, err := v.ConvertGRPCModel()
		if err != nil {
			convertErr = err
			break
		}
		t = append(t, m)
	}

	if convertErr != nil {
		log.Fatalln(convertErr)
		return nil, convertErr
	}
	return &todov1.GetTodosResponse{
		Todos: t,
	}, nil
}

func (s *todoServer) GetStreamTodos(r *todov1.GetStreamTodosRequest, stream todov1.TodoService_GetStreamTodosServer) error {
	return errors.New("unimplemented")
}

func (s *todoServer) AddTodo(ctx context.Context, r *todov1.AddTodoRequest) (*todov1.AddTodoResponse, error) {
	log.Printf("%v\n", r)
	m := &model.Todo{
		Value: r.GetValue(),
		Done:  r.GetDone(),
	}
	if err := s.db.AddTodo(*m); err != nil {
		log.Fatalln(err)
		return nil, err
	}

	res, err := m.ConvertGRPCModel()
	if err != nil {
		log.Fatalln(err)
		return nil, err
	}
	return &todov1.AddTodoResponse{
		Todo: res,
	}, nil

}

func (s *todoServer) UpdateTodo(ctx context.Context, r *todov1.UpdateTodoRequest) (*todov1.UpdateTodoResponse, error) {
	log.Printf("%v\n", r)
	m := &model.Todo{
		Id:    r.GetTodoId(),
		Value: r.GetValue(),
		Done:  r.GetDone(),
	}
	if err := s.db.UpdateTodo(*m); err != nil {
		log.Fatalln(err)
		return nil, err
	}
	res, err := m.ConvertGRPCModel()
	if err != nil {
		log.Fatalln(err)
		return nil, err
	}
	return &todov1.UpdateTodoResponse{
		Todo: res,
	}, nil
}

func connectDB() (*database.DB, error) {
	return database.New(dbUser, dbPassword, dbHost, dbPort, dbName)
}

func main() {

	db, err := connectDB()
	if err != nil {
		log.Fatalln(err)
	}
	if err = db.Migrate(); err != nil {
		log.Fatalln(err)
	}

	var opts []grpc.ServerOption
	s := grpc.NewServer(opts...)
	todov1.RegisterTodoServiceServer(s, newServer(db))

	lis, err := net.Listen("tcp", fmt.Sprintf(":%s", appPort))
	if err != nil {
		log.Fatalln(err)
	}

	log.Println("start backend server.")
	s.Serve(lis)
}
