import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  getOutgoers
} from 'reactflow';
import { useDisclosure, Hide } from '@chakra-ui/react'
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './index.css';
import JSONForm from './JSONForm';
import BasicUsage from './FormModal';
import { operators } from './operators';

const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'input node' },
//     position: { x: 250, y: 5 },
//   },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [captureElementClick, setCaptureElementClick] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({});

  const onNodeClick = (event, node) => {
    onOpen();
    console.log('click node', node)
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const id = getId();
      const newNode = {
        id: id,
        type,
        position,
        data: { label: `${type}` },
      };
    //   const newNodeFormData = {}
    //   const newNodeFormSchema = {
    //     "required": [...operators["common"]["required"], ...operators[type]["required"]], 
    //     "properties": {...operators["common"]["properties"], ...operators[type]["properties"]} 
    //   }
    //   const tempFormData = formData
    //   tempFormData[id] = {"data": newNodeFormData, "schema": newNodeFormSchema}
    //   setFormData({...tempFormData})
      setNodes((nds) => nds.concat(newNode));
    //   console.log(tempFormData);
    },
    [reactFlowInstance],
  );

  const isValidConnection = useCallback(
    (connection) => {
      const target = nodes.find((node) => node.id === connection.target);
      const hasCycle = (node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      return !hasCycle(target);
    },
    [nodes, edges],
  );

  return (
    <div className="dndflow">
        <div>
        <BasicUsage isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </div>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            isValidConnection={isValidConnection}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
