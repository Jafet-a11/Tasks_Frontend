// UpdateUserForm.js
import { React, useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";

const UpdateGrupoForm = ({ visible, onCancel, onUpdate, group, users }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (group) {
            form.setFieldsValue({
                id: group?.id || "",  // Evita errores si group es null
                nameGroup: group?.nameGroup || "",
            });
        }
    }, [group, form]);


    return (
        <Modal
            visible={visible}
            title="Actualizar grupo"
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancelar
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => form.submit()}
                >
                    Actualizar
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" onFinish={onUpdate} >
                <Form.Item label="ID de grupo">
                    <Input value={group?.id || ""} disabled />
                </Form.Item>
                <Form.Item
                    name="nameGroup"
                    label="Nombre del grupo"
                    rules={[{ required: true, message: "Por favor ingrese el nombre del grupo" }]}
                >
                    <Input />
                </Form.Item>

                {/* Campo oculto para almacenar el nombre del grupo */}
                

            </Form>
        </Modal>
    );
};

export default UpdateGrupoForm;
