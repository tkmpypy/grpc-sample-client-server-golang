.PHONY: dep
dep:
	protodep up -u
	buf generate proto

.PHONY: run
run: run-server run-client
run-server:
	go run server/server.go &
run-client:
	go run client/client.go
