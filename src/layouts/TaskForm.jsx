import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';

const { Option } = Select;

const TaskForm = ({ form, handleOk, handleCancel }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="nameTask"
        label="Nombre de la Tarea"
        rules={[{ required: true, message: "Ingresa el nombre de la tarea" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category"
        label="Categoría"
        rules={[{ required: true, message: "Selecciona una categoría" }]}
      >
        <Select placeholder="Selecciona una categoría">
          <Option value="Trabajo">Trabajo</Option>
          <Option value="Personal">Personal</Option>
          <Option value="Estudio">Estudio</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="deadline"
        label="Fecha Límite"
        rules={[{ required: true, message: "Selecciona una fecha" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        rules={[{ required: true, message: "Ingresa una descripción" }]}
      >
        <Input.TextArea rows={3} />
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
      <Button type="primary" onClick={handleOk}>
        Guardar
      </Button>
      <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
        Cancelar
      </Button>
    </Form>
  );
};

export default TaskForm;
