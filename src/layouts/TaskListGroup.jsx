import React from "react";
import { Row, Col, Card, Tag, Button } from "antd";
import {DeleteOutlined } from "@ant-design/icons";
const TaskListGroup = ({ groupeTasks, openModal, onDelete }) => {
  const username = localStorage.getItem("username");
  return (
    <Row gutter={[16, 16]}>
      {["Deshecho", "Pausada", "En Progreso", "Completado"].map((status) => (
        <Col span={6} key={status}>
          <Card title={status}>
            {groupeTasks[status] && groupeTasks[status].length > 0 ? (
              groupeTasks[status].map((task) => (
                <Card key={task.id} style={{ marginBottom: 16 }}>
                  <p>{task.nameTask}</p>
                  <p>{task.description}</p>
                  <p>{task.assignedUser}</p>
                  <Tag color="blue">{task.status}</Tag>
                  {username === task.assignedUser && (
                    <Button
                      type="link"
                      onClick={() => openModal(task)}
                      style={{ marginTop: 8 }}
                    >
                      Editar Estado
                    </Button>
                  )}
                    {username === task.assigned_by && (
                  <Button
                    type="default"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderColor: "red",
                    }}
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(task.id)}
                  />
                  )}
                </Card>
              ))
            ) : (
              <p>No hay tareas en este estado.</p>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TaskListGroup;