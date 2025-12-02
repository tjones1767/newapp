import React, { useState } from 'react';
import { TargetInput } from './TargetInput';
import { VARS } from '../../constants';
import { useSettings } from '../../context/SettingsContext';
import { TemplateEditor } from './TemplateEditor';

export function TargetList({ program, onUpdate, onGlobalVarRename }) {
    const { settings: globalSettings } = useSettings();
    const [showTargetTemplate, setShowTargetTemplate] = useState(false);

    const getVar = (key) => (globalSettings.variableMap && globalSettings.variableMap[key]) || key;

    const handleChange = (field, value) => {
        onUpdate(program.id, { ...program, [field]: value });
    };

    const handleVarRename = (oldKey, newName) => {
        onGlobalVarRename(oldKey, newName);
    };

    // Dynamic Variables for Legend
    const getDynamicVars = (type) => {
        return (VARS[type] || []).map(v => ({ ...v, name: getVar(v.name) }));
    };

    const handleAddTarget = () => {
        const newTarget = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            name: '',
            verb: 'provided',
            mode: 'trial',
            correct: '',
            total: '',
            percentages: '',
            sessions: 1
        };
        handleChange('targets', [...(program.targets || []), newTarget]);
    };

    const handleUpdateTarget = (targetId, updates) => {
        const updatedTargets = program.targets.map(t =>
            t.id === targetId ? updates : t
        );
        handleChange('targets', updatedTargets);
    };

    const handleDeleteTarget = (targetId) => {
        if (window.confirm('Remove this target?')) {
            handleChange('targets', program.targets.filter(t => t.id !== targetId));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-md)' }}>
                <div className="flex items-center gap-xs">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Targets</h3>
                    <input
                        className="editable-label-input"
                        value={getVar('{targets_summary}')}
                        onChange={(e) => handleVarRename('{targets_summary}', e.target.value)}
                        style={{ fontSize: '1.1rem' }}
                    />
                </div>
                <div className="flex gap-sm">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setShowTargetTemplate(!showTargetTemplate)}
                        style={{ fontSize: '0.75rem', padding: '2px 8px' }}
                    >
                        {showTargetTemplate ? 'Hide Template' : 'Template'}
                    </button>
                    <button className="btn btn-primary" onClick={handleAddTarget} style={{ fontSize: '0.875rem', padding: 'var(--space-xs) var(--space-md)' }}>
                        + Add Target
                    </button>
                </div>
            </div>

            {showTargetTemplate && (
                <div style={{ background: 'var(--color-bg)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)' }}>
                    <TemplateEditor
                        label="Target Summary Template"
                        value={program.targetTemplate}
                        onChange={(val) => handleChange('targetTemplate', val)}
                        defaultValue={globalSettings.defaultTargetTemplate}
                        variables={getDynamicVars('target')}
                        rows={1}
                    />
                </div>
            )}

            <div className="flex flex-col gap-md">
                {(!program.targets || program.targets.length === 0) ? (
                    <div style={{ padding: 'var(--space-lg)', textAlign: 'center', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)' }}>
                        No targets added yet. Click "+ Add Target" to begin.
                    </div>
                ) : (
                    program.targets.map(target => (
                        <TargetInput
                            key={target.id}
                            target={target}
                            onUpdate={(updates) => handleUpdateTarget(target.id, updates)}
                            onDelete={() => handleDeleteTarget(target.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
