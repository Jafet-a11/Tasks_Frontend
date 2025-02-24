import { Card, Col, Row, Button, Tag } from "antd";
import { BookOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
// Función para asignar colores según la categoría
const getCategoryColor = (category) => {
  switch (category.toLowerCase()) {
    case "personal":
      return "#f6d365"; // Amarillo claro
    case "trabajo":
      return "#85c1e9"; // Azul
    case "estudio":
      return "#90E9BE"; // Verde menta
    default:
      return "#d5d8dc"; // Gris por defecto
  }
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <Row gutter={[16, 16]}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Col span={8} key={task.id}>
            <Card
              bordered={true}
              style={{
                backgroundColor: getCategoryColor(task.category),
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{task.nameTask}</span>
                  <Tag color="blue">{task.status}</Tag>
                </div>
              }
            >
              <p>
                <strong>Categoría:</strong> {task.category}
              </p>
              <p>
                <strong>Descripción:</strong> {task.description}
              </p>
              <p>
                <strong>Fecha:</strong>
                {task.deadline
                  ? moment(new Date(task.deadline._seconds * 1000)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ) // Formato de fecha
                  : "Sin fecha"}{" "}
                {/* Si no hay fecha, muestra 'Sin fecha' */}
              </p>

              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  onClick={() => onEdit(task)}
                />
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
              </div>
            </Card>
          </Col>
        ))
      ) : (
        <Col span={24}>
          <Card bordered={false}>
            <p>No tienes tareas registradas.</p>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default TaskList;
