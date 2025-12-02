import React from 'react';

export function Sidebar({ programs, activeId, onSelect, onAdd, onDelete, onOpenSettings, onDuplicate }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'mastered': return '✅';
            case 'on-hold': return '⏸️';
            case 'not-introduced': return '⏹️';
            default: return '▶️';
        }
    };

    return (
        <aside className="card" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', flexShrink: 0 }}>
            <div className="flex justify-between items-center">
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Programs</h2>
                <div className="flex gap-xs">
                    <button className="btn btn-ghost" onClick={onOpenSettings} title="Settings" style={{ padding: 'var(--space-sm)' }}>
                        ⚙️
                    </button>
                    <button className="btn btn-primary" onClick={onAdd} title="Add New Program">
                        + New
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', overflowY: 'auto', flex: 1 }}>
                {programs.length === 0 ? (
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textAlign: 'center', padding: 'var(--space-md) 0' }}>
                        No programs yet.
                    </p>
                ) : (
                    programs.map(program => (
                        <div
                            key={program.id}
                            className={`program-item ${activeId === program.id ? 'active' : ''}`}
                            onClick={() => onSelect(program.id)}
                            style={{
                                padding: 'var(--space-sm) var(--space-md)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                backgroundColor: activeId === program.id ? 'var(--color-primary-light)' : 'transparent',
                                color: activeId === program.id ? 'var(--color-primary)' : 'inherit',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'background-color var(--transition-fast)'
                            }}
                        >
                            <div className="flex items-center gap-xs" style={{ overflow: 'hidden' }}>
                                <span style={{ fontSize: '0.8rem' }}>{getStatusIcon(program.status)}</span>
                                <span style={{ fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {program.name || 'Untitled Program'}
                                </span>
                            </div>
                            <div className="flex gap-xs">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDuplicate(program.id); }}
                                    className="action-btn"
                                    title="Duplicate"
                                >
                                    📋
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDelete(program.id); }}
                                    className="action-btn delete-btn"
                                    title="Delete"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style>{`
        .program-item:hover {
          background-color: var(--color-surface-hover);
        }
        .program-item.active:hover {
          background-color: var(--color-primary-light);
        }
        .action-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            color: var(--color-text-muted);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
        }
        .action-btn:hover {
            background-color: var(--color-surface-hover);
            color: var(--color-text);
        }
        .delete-btn:hover {
          background-color: var(--color-danger);
          color: white !important;
        }
      `}</style>
        </aside>
    );
}
