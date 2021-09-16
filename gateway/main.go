package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	todov1 "github.com/tkmpypy/grpc-sample-client-golang/gateway/gen/golang/proto/todoapis/todo/v1"
	"google.golang.org/grpc"
	"github.com/gorilla/handlers"
)

var (
	appPort     string = os.Getenv("APP_PORT")
	backendHost string = os.Getenv("BACKEND_HOST")
	backendPort string = os.Getenv("BACKEND_PORT")
)

func main() {
	log.Println("start gateway server")
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer func() {
		log.Println("gateway server canceled")
		cancel()
	}()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{
		grpc.WithInsecure(),
	}
	if err := todov1.RegisterTodoServiceHandlerFromEndpoint(ctx, mux, fmt.Sprintf("%s:%s", backendHost, backendPort), opts); err != nil {
		log.Fatalln(err)
		panic(err)
	}

	handler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{http.MethodPost, http.MethodGet, http.MethodPut, http.MethodDelete, http.MethodPatch, http.MethodOptions}),
		handlers.AllowedHeaders([]string{"Authorization", "Content-Type", "Accept-Encoding", "Accept"}),
	)(mux)


	http.ListenAndServe(fmt.Sprintf(":%s", appPort), handler)
}
