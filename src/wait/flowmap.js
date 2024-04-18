import React,{useEffect,useRef} from 'react';
import { Button, Modal } from 'antd';
import BpmnJS from 'bpmn-js';
import './flowmap.css'
const FlowMap = ({ isopen, setOpen, activity }) => {
    const containerRef = useRef(null); // 使用 useRef 创建容器元素的引用
    let diagramUrl = '';
    if (activity && activity.activityId && activity.activityId.includes("demo1")) {
        diagramUrl = "http://192.168.2.144:9090/demo.bpmn"
    }
    const handleOk = () => {
        setOpen(false)
    };
    const handleCancel = () => {
        setOpen(false)
    };
    useEffect(() => {
        const bpmnViewer = new BpmnJS({ container: containerRef.current });
    
        const openDiagram = async (bpmnXML) => {
          try {
            await bpmnViewer.importXML(bpmnXML);
            console.log("导入成功");
             // 获取 BPMN 模型实例
             const bpmnModel = bpmnViewer.get('elementRegistry');
            console.log(bpmnModel);
             // 获取需要添加标记的任务元素的 ID
             const taskId = activity.childActivityInstances[0].activityId;
            const canvas = bpmnViewer.get('canvas');
            const overlays = bpmnViewer.get('overlays');
            canvas.zoom('fit-viewport');
            // 添加标记到任务元素上
            overlays.add(taskId,'note', {
                position: {
                    bottom: 25,
                    right: 95
                },
                html: '<div class="diagram-note"></div>'
            });
            canvas.addMarker(taskId, 'needs-discussion');
          } catch (err) {
            console.error('Could not import BPMN 2.0 diagram', err);
          }
        };
    
        const fetchDiagram = async () => {
          try {
            const response = await fetch(diagramUrl);
            const bpmnXML = await response.text();
            openDiagram(bpmnXML);
          } catch (err) {
            console.error('Failed to fetch BPMN diagram', err);
          }
        };
    
        fetchDiagram();
    
        // Cleanup function
        return () => {
          bpmnViewer.destroy();
        };
      }, [activity]);
    return (
        <>
            <Modal
                open={isopen}
                title="流程图"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" type="primary" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        确认
                    </Button>
                ]}
            >
            <div ref={containerRef} ></div>
            </Modal>
        </>
    );
};
export default FlowMap;