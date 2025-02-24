import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
  { id: "1", title: "Tarea 1", status: "Pendiente" },
  { id: "2", title: "Tarea 2", status: "En Progreso" },
  { id: "3", title: "Tarea 3", status: "Completada" },
  { id: "4", title: "Tarea 4", status: "Pendiente" },
];

const statuses = ["Pendiente", "En Progreso", "Completada"];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = tasks.map((task) =>
      task.id === result.draggableId
        ? { ...task, status: result.destination.droppableId }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={16}>
        {statuses.map((status) => (
          <Col span={8} key={status}>
            <h2>{status}</h2>
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ minHeight: "200px", padding: "10px", background: "#f0f2f5" }}
                >
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ marginBottom: "8px" }}
                          >
                            {task.title}
                          </Card>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        ))}
      </Row>
    </DragDropContext>
  );
};

export default KanbanBoard;