import React, { useState, useEffect } from "react";
import { Form, Select, Button } from "antd";

const { Option } = Select;

const StatusForm = ({ tasks, userGroupId, handleUpdateStatus }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (userGroupId && tasks.length > 0) {
      const groupTasks = tasks.filter(
        (task) => Number(task.group_id) === Number(userGroupId)
      );
      setFilteredTasks(groupTasks);
    }
  }, [tasks, userGroupId]);

  const onFinish = (values) => {
    console.log("Valores del formulario:", values);
    console.log("Status antes de handleUpdateStatus:", values.status);
    if (values.status && values.taskId) {

      handleUpdateStatus(values.taskId, values.status);
        console.log("Estatus:"+values.status);
    } else {
      console.error("status o taskId no están definidos");
    }
  };
  if (!filteredTasks.length) {
    return <p>No hay tareas disponibles para actualizar en tu grupo.</p>;
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="taskId"
        label="Seleccionar Tarea"
        rules={[{ required: true, message: "Selecciona una tarea" }]}
      >
        <Select placeholder="Selecciona una tarea">
          {filteredTasks.map((task) => (
            <Option key={task.id} value={task.id}>
              {task.nameTask}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Estado"
        rules={[{ required: true, message: "Selecciona el estado de la tarea" }]}
      >
        <Select placeholder="Selecciona un estado">
          <Option value="Deshecho">Deshecho</Option>
          <Option value="Pausada">Pausada</Option>
          <Option value="En Progreso">En Progreso</Option>
          <Option value="Completado">Completado</Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Actualizar Estado
      </Button>
    </Form>
  );
};

export default StatusForm;