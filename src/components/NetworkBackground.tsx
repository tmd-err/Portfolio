import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
}

interface Connection {
  from: number;
  to: number;
  distance: number;
}

const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createNodes = () => {
      const nodeCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 25000);
      nodesRef.current = [];

      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          id: i,
        });
      }
    };

    const createConnections = () => {
      const nodes = nodesRef.current;
      const connections: Connection[] = [];
      const maxDistance = 200;
      
      // Create minimum spanning tree for base connections
      const visited = new Set<number>();
      const edges: Connection[] = [];
      
      // Calculate all possible edges within maxDistance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            edges.push({ from: i, to: j, distance });
          }
        }
      }
      
      // Sort edges by distance (closest first)
      edges.sort((a, b) => a.distance - b.distance);
      
      // Kruskal's algorithm for minimum spanning tree
      const parent = new Array(nodes.length).fill(0).map((_, i) => i);
      
      const find = (x: number): number => {
        if (parent[x] !== x) {
          parent[x] = find(parent[x]);
        }
        return parent[x];
      };
      
      const union = (x: number, y: number) => {
        parent[find(x)] = find(y);
      };
      
      // Add edges to create spanning tree
      for (const edge of edges) {
        if (find(edge.from) !== find(edge.to)) {
          connections.push(edge);
          union(edge.from, edge.to);
        }
      }
      
      // Add some additional connections for visual appeal (but not too many)
      const additionalConnections = Math.floor(nodes.length * 0.3); // 30% of nodes get extra connections
      let added = 0;
      
      for (const edge of edges) {
        if (added >= additionalConnections) break;
        if (!connections.some(c => (c.from === edge.from && c.to === edge.to) || (c.from === edge.to && c.to === edge.from))) {
          connections.push(edge);
          added++;
        }
      }
      
      connectionsRef.current = connections;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const mouseDistance = 150;

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const force = (mouseDistance - distance) / mouseDistance;
          node.vx += (dx / distance) * force * 0.03;
          node.vy += (dy / distance) * force * 0.03;
        }

        // Apply friction
        node.vx *= 0.98;
        node.vy *= 0.98;
      });

      // Draw connections - Clean and organized
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      
      connections.forEach((connection) => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        if (fromNode && toNode) {
          const dx = fromNode.x - toNode.x;
          const dy = fromNode.y - toNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Vary opacity based on distance
          const opacity = Math.max(0.1, (200 - distance) / 200);
          ctx.globalAlpha = opacity * 0.6;
          
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
        }
      });

      // Draw nodes - Bigger and more prominent
      ctx.globalAlpha = 1;
      nodes.forEach((node) => {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 5);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Extra glow for nodes near mouse
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseDistance) {
          const intensity = (mouseDistance - distance) / mouseDistance;
          ctx.shadowColor = 'rgba(0, 255, 255, 0.9)';
          ctx.shadowBlur = 15 * intensity;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3 * intensity, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      resizeCanvas();
      createNodes();
      createConnections();
    };

    resizeCanvas();
    createNodes();
    createConnections();
    animate();

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, hsl(220 15% 8%) 0%, hsl(250 20% 12%) 100%)' }}
    />
  );
};

export default NetworkBackground;