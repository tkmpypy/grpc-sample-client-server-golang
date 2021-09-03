# grpc-sample-server-golang

## Prerequired

| tool                                                                             | summary                                                                |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Golang](https://golang.org/doc/devel/release.html)                              | Golang runtime                                                         |
| [Protocol buffer compiler](https://github.com/protocolbuffers/protobuf/releases) | Protocol Buffer compiler                                               |
| protoc-gen-go                                                                    | protoc plugin for Golang                                               |
| protoc-gen-go-grpc                                                               | protoc plugin for Golang                                               |
| [protodep](https://github.com/stormcat24/protodep)                               | Dependency tool for Protocol Buffers IDL file (.proto) vendoring tool. |
| [Buf](https://github.com/bufbuild/buf)                                           | Building a modern Protobuf ecosystem                                   |

## Dependencies

1. `protodep up -u`
2. `buf gen proto`

## Run

### Go

1. `go run server/server.go`
2. `go run client/client.go`

### Make

1. `make run`
