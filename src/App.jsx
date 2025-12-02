import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProgramCard } from './components/ProgramCard';
import { LivePreview } from './components/LivePreview';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { DEFAULTS } from './constants';
import { useSettings } from './context/SettingsContext';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('bcba_programs');
    return saved ? JSON.parse(saved) : (DEFAULTS.programs || []);
  });

  const { settings: globalSettings, updateSettings } = useSettings();
  const [activeId, setActiveId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Resizable state
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [previewWidth, setPreviewWidth] = useState(350);
  const containerRef = useRef(null);

  const debouncedPrograms = useDebounce(programs, 1000);

  useEffect(() => {
    localStorage.setItem('bcba_programs', JSON.stringify(debouncedPrograms));
  }, [debouncedPrograms]);

  // Resizing Logic
  const startResizing = (mouseDownEvent, direction) => {
    mouseDownEvent.preventDefault();

    const startX = mouseDownEvent.clientX;
    const startWidth = direction === 'left' ? sidebarWidth : previewWidth;

    const doDrag = (mouseMoveEvent) => {
      if (direction === 'left') {
        const newWidth = startWidth + mouseMoveEvent.clientX - startX;
        if (newWidth > 150 && newWidth < 500) setSidebarWidth(newWidth);
      } else {
        const newWidth = startWidth - (mouseMoveEvent.clientX - startX);
        if (newWidth > 200 && newWidth < 600) setPreviewWidth(newWidth);
      }
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
    document.body.style.cursor = 'col-resize';
  };

  const handleAddProgram = () => {
    const newProgram = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      name: 'New Program',
      goal: '',
      plan: '',
      barriers: '',
      status: 'in-progress',
      prompts: [],
      template: globalSettings.defaultTemplate,
      masteredTemplate: globalSettings.defaultMasteredTemplate,
      onHoldTemplate: globalSettings.defaultOnHoldTemplate,
      notIntroducedTemplate: globalSettings.defaultNotIntroducedTemplate,
      promptsTemplate: globalSettings.defaultPromptsTemplate,
      targetTemplate: globalSettings.defaultTargetTemplate,
      targets: [],
    };
    setPrograms([...programs, newProgram]);
    setActiveId(newProgram.id);
  };

  const handleDeleteProgram = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter(p => p.id !== id));
      if (activeId === id) setActiveId(null);
    }
  };

  const handleUpdateProgram = (id, updates) => {
    setPrograms(programs.map(p => p.id === id ? updates : p));
  };

  const handleDuplicateProgram = (id) => {
    const programToDuplicate = programs.find(p => p.id === id);
    if (programToDuplicate) {
      const newProgram = {
        ...programToDuplicate,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        name: `${programToDuplicate.name} (Copy)`,
      };
      setPrograms([...programs, newProgram]);
      setActiveId(newProgram.id);
    }
  };

  const handleGlobalVarRename = (oldKey, newName) => {
    const newMap = { ...globalSettings.variableMap, [oldKey]: newName };
    updateSettings({ ...globalSettings, variableMap: newMap });
  };

  const activeProgram = programs.find(p => p.id === activeId);

  return (
    <div className="flex h-screen bg-bg text-text">
      <div className="flex-1 flex flex-col w-full p-md gap-md" ref={containerRef}>
        <header className="flex justify-between items-center py-sm border-b border-border">
          <h1 className="text-2xl font-bold text-primary">BCBA Progress Note Generator</h1>
          <button className="btn btn-ghost" onClick={() => setShowHelp(true)} title="Help">❓</button>
        </header>

        <div className="flex flex-1 overflow-hidden" style={{ gap: 0 }}>
          <div style={{ width: sidebarWidth, display: 'flex', flexDirection: 'column' }}>
            <Sidebar
              programs={programs}
              activeId={activeId}
              onSelect={setActiveId}
              onAdd={handleAddProgram}
              onDelete={handleDeleteProgram}
              onDuplicate={handleDuplicateProgram}
              onOpenSettings={() => setShowSettings(true)}
            />
          </div>

          <div className="resizer" onMouseDown={(e) => startResizing(e, 'left')} />

          <main className="flex-1 flex flex-col overflow-hidden" style={{ padding: '0 var(--space-md)' }}>
            {activeProgram ? (
              <ProgramCard
                program={activeProgram}
                onUpdate={handleUpdateProgram}
                onGlobalVarRename={handleGlobalVarRename}
              />
            ) : (
              <div className="card flex flex-col items-center justify-center h-full text-text-muted gap-md">
                <div style={{ fontSize: '3rem' }}>📝</div>
                <h2 className="text-xl font-bold text-text">Welcome to BCBA Notes</h2>
                <p style={{ textAlign: 'center', maxWidth: '400px' }}>
                  Select a program from the sidebar or create a new one to get started.
                </p>
                <button className="btn btn-primary" onClick={handleAddProgram}>
                  + Create New Program
                </button>
              </div>
            )}
          </main>

          <div className="resizer" onMouseDown={(e) => startResizing(e, 'right')} />

          <aside style={{ width: previewWidth, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            {activeProgram ? (
              <LivePreview
                program={activeProgram}
              />
            ) : (
              <div className="card flex items-center justify-center h-full text-text-muted">
                Preview will appear here.
              </div>
            )}
          </aside>
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
        />
      )}

      {showHelp && (
        <HelpModal
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}

export default App;
