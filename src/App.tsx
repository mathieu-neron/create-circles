import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { type } from 'os';

interface Coords {
  x: number;
  y: number;
}

function Circle(props: Coords) {
  return (
    <div className="Circle" style={{left: `${props.x}px`, top: `${props.y}px`,}}>
    </div>
  );
}

function App() {
  const [circles, setCircles] = useState<Coords[]>([]);
  const [undoStack, setUndoStack] = useState<Coords[]>([]);
  const divElement = useRef(null);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    setCircles([...circles, {x, y}]);
  };

  const handleUndo = () => {
    if (circles.length === 0) return;
    const last = circles.pop();
    setCircles([...circles]);
    if (last) setUndoStack([...undoStack, last]);
  };

  const handleRedo = () => {
    if (undoStack.length === 0) return;
    const last = undoStack.pop();
    setUndoStack([...undoStack]);
    if (last) setCircles([...circles, last]);
  };

  return (
    <>
    <button disabled={circles.length === 0} onClick={handleUndo}>Undo</button>
    <button disabled={undoStack.length === 0} onClick={handleRedo}>Redo</button>
    <div ref={divElement} className="App" onClick={handleClick}>
      {circles.map((circle, idx) => (
        <Circle key={idx} x={circle.x} y={circle.y} />
      ))}
    </div>
    </>
  );
}

export default App;
