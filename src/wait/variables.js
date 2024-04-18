import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Form } from 'antd';
import { QueryVariables } from '../api/api';
const Variables = ({ isopen, setOpen, processInstanceId }) => {
  const [loading, setLoading] = useState(false);
  const [variable, setVariable] = useState(null)
  const token = localStorage.getItem('token')
  const handleQueryVariables = () => {
    QueryVariables(token, processInstanceId)
      .then(Response => {
        setVariable(Response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false)
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false)
  };
  useEffect(() => {
    if (isopen) {
      handleQueryVariables();
    }
  }, [isopen, processInstanceId]);
  return (
    <>
      <Modal
        open={isopen}
        title="表单内容"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary"  onClick={handleCancel}>
            确认
          </Button>
        ]}
      >
        <Form>
          {variable &&
            variable
              .filter(item => item.name.includes("filed"))
              .map((item, index) => (
                <Form.Item key={index} label={item.name}>
                  <Input value={item.value} disabled />
                </Form.Item>
              ))}
        </Form>
      </Modal>
    </>
  );
};
export default Variables;