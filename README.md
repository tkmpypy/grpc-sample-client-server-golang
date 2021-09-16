# grpc-sample-server-golang

## About

- this sample project implemented by used proto file defined by [this](https://github.com/tkmpypy/grpc-sample-proto) repository
- this sample repository is monolithic repository

## Prerequired

| tool                                                                             | summary                                                                                                                  |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Golang](https://golang.org/doc/devel/release.html)                              | Golang runtime                                                                                                           |
| [Protocol buffer compiler](https://github.com/protocolbuffers/protobuf/releases) | Protocol Buffer compiler                                                                                                 |
| protoc-gen-go                                                                    | protoc plugin for Golang                                                                                                 |
| protoc-gen-go-grpc                                                               | protoc plugin for Golang                                                                                                 |
| [protoc-gen-grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway)        | It reads protobuf service definitions and generates a reverse-proxy server which translates a RESTful HTTP API into gRPC |
| [protodep](https://github.com/stormcat24/protodep)                               | Dependency tool for Protocol Buffers IDL file (.proto) vendoring tool.                                                   |
| [Buf](https://github.com/bufbuild/buf)                                           | Building a modern Protobuf ecosystem                                                                                     |

## Preparation

### Dependencies

```sh
$ cd ./server
$ protodep up -u -f
$ buf mod update
$ buf build
$ buf generate
$ go mod tidy
```

or 

```sh
$ cd ./server
$ make dep
```

_and do same operation in `./gateway` directory_

## Build and Run

1. `docker-compose up`
2. Go to `http://localhost:3003` in your browser
