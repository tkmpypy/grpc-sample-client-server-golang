package main

import (
	"log"
	"time"

	todov1 "github.com/tkmpypy/grpc-sample-client-server-golang/gen/proto/golang/todoapis/todo/v1"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

func getTodo(client todov1.TodoServiceClient, params *todov1.GetTodoRequest) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	todo, err := client.GetTodo(ctx, params)
	if err != nil {
		log.Fatalf("%v.GetTodo() => %v", client, err)
	}
	log.Println(todo)
}

func main() {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithInsecure())
	opts = append(opts, grpc.WithBlock())
	
	conn, err := grpc.Dial("localhost:12345", opts...)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	client := todov1.NewTodoServiceClient(conn)

	params := &todov1.GetTodoRequest{
		TodoId: 1,
	}
	getTodo(client, params)

}
