package main

import (
	"context"
	"fmt"
	"net"

	todov1 "github.com/tkmpypy/grpc-sample-client-server-golang/gen/proto/golang/todoapis/todo/v1"
	"google.golang.org/grpc"
)

type todoServer struct {
	todov1.UnimplementedTodoServiceServer
}

func newServer() *todoServer {
	s := &todoServer{}
	return s
}

func (s *todoServer) GetTodo(ctx context.Context, r *todov1.GetTodoRequest) (*todov1.GetTodoResponse, error) {
	res := &todov1.GetTodoResponse{
		TodoId: 1,
		Value:  "example todo",
		Done:   false,
	}
	return res, nil
}

func main() {
	var opts []grpc.ServerOption
	s := grpc.NewServer(opts...)
	todov1.RegisterTodoServiceServer(s, newServer())

	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", 12345))
	if err != nil {
		panic(err)
	}
	s.Serve(lis)
}
