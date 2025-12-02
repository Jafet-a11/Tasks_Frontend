import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "antd";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        background:"white",
      }}
    >
      <h2>Landing Page</h2>

      {/* Se usa Row y Col para alinear los botones horizontalmente */}
      <Row gutter={16} justify="center">
        <Col span={12}>
          <Button type="primary" block onClick={() => navigate("/LoginPage")}>
            Login
          </Button>
        </Col>

        <Col span={12}>
          <Button type="primary" danger block 
          onClick={() => navigate("/Registrationpage")}>
            Registro
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
