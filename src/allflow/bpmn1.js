import React,{useEffect}  from 'react';
import BpmnJS from 'bpmn-js';
const diagramUrl = 'http://182.168.2.144:9090/demo.bpmn';
const Bpmn1 = () => {
    useEffect(() => {
      const bpmnViewer = new BpmnJS({ container: '#canvas' });
  
      const openDiagram = async (bpmnXML) => {
        try {
          await bpmnViewer.importXML(bpmnXML);
  
          const canvas = bpmnViewer.get('canvas');
          const overlays = bpmnViewer.get('overlays');
  
          canvas.zoom('fit-viewport');
  
          overlays.add('SCAN_OK', 'note', {
            position: {
              bottom: 0,
              right: 0
            },
            html: '<div class="diagram-note">Mixed up the labels?</div>'
          });
  
          canvas.addMarker('SCAN_OK', 'needs-discussion');
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
    }, []);
  
    return <div id="canvas" style={{ width: '100%', height: '200' }} />;
  };
export default Bpmn1;