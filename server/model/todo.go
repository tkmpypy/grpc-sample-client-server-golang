package model

import (
	"time"

	todov1 "github.com/tkmpypy/grpc-sample-client-golang/server/gen/golang/proto/todoapis/todo/v1"
	"github.com/golang/protobuf/ptypes"
)

type Todo struct {
	Value   string `xorm:"varchar(255) not null"`
	Id      int64
	Done    bool      `xorm:"not null"`
	Created time.Time `xorm:"created"`
	Updated time.Time `xorm:"updated"`
}

func (t *Todo) ConvertGRPCModel() (*todov1.Todo, error) {
	c, err := ptypes.TimestampProto(t.Created)
	if err != nil {
		return nil, err
	}
	u, err := ptypes.TimestampProto(t.Updated)
	if err != nil {
		return nil, err
	}
	return &todov1.Todo{
		TodoId: t.Id,
		Done: t.Done,
		Value: t.Value,
		CreatedAt: c,
		UpdatedAt: u,
	}, nil
}
