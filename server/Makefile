.PHONY: dep
dep:
	protodep up -u -f
	buf mod update
	buf build
	buf generate
	go mod tidy

.PHONY: run
run:
	go run main.go
