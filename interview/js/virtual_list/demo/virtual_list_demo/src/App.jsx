import { useState } from 'react'
import './App.css'
import VirtualList from './components/VirtualList'

const generateData = (count) => 
  Array.from({length: count}, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: 
      `This is item number ${i}, rendered with virtual scrolling`
  }))


function App() {
  const data = generateData(100000);
  const renderItem = (item, index) => (
    <div
      style={{
        padding: '10px',
        borderBottom: '1px solid #eee',
        backgroundColor: index % 2 === 0 ? '#f9f9f9': '#fff'
      }}
    >
      <strong>[{index}]</strong> {item.name}
      <p
        style={{margin:'4px 0', fontSize: '0.9em', color: '#666'}}
      >
        {item.description}
      </p>
    </div>
  )
  return (
    <div style={}>
      
    </div>
  )
}

export default App