import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { VARS } from '../constants';
import { ProgramDetails } from './program/ProgramDetails';
import { PromptsSection } from './program/PromptsSection';
import { TargetList } from './program/TargetList';
import { TemplateEditor } from './program/TemplateEditor';

export function ProgramCard({ program, onUpdate, onGlobalVarRename }) {
    const { settings: globalSettings } = useSettings();
    const [showMainTemplate, setShowMainTemplate] = useState(false);

    const getVar = (key) => (globalSettings.variableMap && globalSettings.variableMap[key]) || key;

    const handleChange = (field, value) => {
        onUpdate(program.id, { ...program, [field]: value });
    };

    // Dynamic Variables for Legend
    const getDynamicVars = () => {
        return VARS.main.map(v => ({ ...v, name: getVar(v.name) }));
    };

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', overflowY: 'auto', height: '100%' }}>
            <div className="flex justify-between items-center">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Edit Program</h2>
                <button
                    className="btn btn-ghost"
                    onClick={() => setShowMainTemplate(!showMainTemplate)}
                    style={{ fontSize: '0.875rem' }}
                >
                    {showMainTemplate ? 'Hide Structure' : 'Edit Structure'}
                </button>
            </div>

            {showMainTemplate && (
                <TemplateEditor
                    label="Main Narrative Template"
                    value={program.template}
                    onChange={(val) => handleChange('template', val)}
                    defaultValue={globalSettings.defaultTemplate}
                    variables={getDynamicVars()}
                    rows={3}
                />
            )}

            <ProgramDetails
                program={program}
                onUpdate={onUpdate}
                onGlobalVarRename={onGlobalVarRename}
            />

            <PromptsSection
                program={program}
                onUpdate={onUpdate}
                onGlobalVarRename={onGlobalVarRename}
            />

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />

            <TargetList
                program={program}
                onUpdate={onUpdate}
                onGlobalVarRename={onGlobalVarRename}
            />
        </div>
    );
}
