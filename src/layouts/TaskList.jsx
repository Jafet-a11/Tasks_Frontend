import { Card, Col, Row } from 'antd';

const TaskList = ({ tasks }) => {
  return (
    <Row gutter={16}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Col span={8} key={task.id}>
            <br></br>
            <Card title={task.nameTask} bordered={true}>
              <p><strong>Categoría:</strong> {task.category}</p>
              <p><strong>Estado:</strong> {task.status}</p>
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
