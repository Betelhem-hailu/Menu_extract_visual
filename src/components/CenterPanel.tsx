import React from "react";
import "./centerpanel.css";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  DefaultEdgeOptions,
  NodeTypes,
  BackgroundVariant,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useCallback } from "react";
import CustomNode from "./CustomNode.tsx";

const initialNodes: Node[] = [
  { id: "1", data: { label: "Node 1" }, position: { x: 5, y: 5 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2"}];


const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 5,
    height: 30,
    color: '#14a73e98',
  },
  style: {
    strokeWidth: 2,
    stroke: '#14a73e98',
  },
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const CenterPanel = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: { x: 100, y: 100 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const deleteSelectedNode = () => {
    if (selectedNodeId) {
      setNodes((prevNodes) =>
        prevNodes.filter((node) => node.id !== selectedNodeId)
      );
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) =>
            edge.source !== selectedNodeId && edge.target !== selectedNodeId
        )
      );
      setSelectedNodeId(null);
    }
  };

  const duplicateSelectedNode = () => {
    if (selectedNodeId) {
      const selectedNode = nodes.find((node) => node.id === selectedNodeId);
      if (selectedNode) {
        const newNode = {
          ...selectedNode,
          id: `${selectedNode.id}_duplicate`,
          position: {
            x: selectedNode.position.x + 10,
            y: selectedNode.position.y + 10,
          },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
      }
    }
  };

  const handleNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
    console.log(node.id);
  };

  const isDeleteButtonDisabled = nodes.length === 0;

  return (
    <div className="center_wrapper">
      <div className="tools">
        <button className="button add" onClick={addNode}>
          Add Node
        </button>
        <button
          onClick={deleteSelectedNode}
          disabled={isDeleteButtonDisabled}
          className="button delete"
        >
          Delete Selected Node
        </button>
        <button
        onClick={duplicateSelectedNode}
        disabled={!selectedNodeId}
       className="button duplicate"
      >
        Duplicate Selected Node
      </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onConnect={onConnect}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
      >
        <Background
          gap={10}
          color="#14a73e98"
          variant={BackgroundVariant.Dots}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CenterPanel;
