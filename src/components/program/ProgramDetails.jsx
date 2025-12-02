import React, { useState } from 'react';
import { VARS } from '../../constants';
import { useSettings } from '../../context/SettingsContext';
import { TemplateEditor } from './TemplateEditor';

export function ProgramDetails({ program, onUpdate, onGlobalVarRename }) {
    const { settings: globalSettings } = useSettings();
    const [showStatusTemplate, setShowStatusTemplate] = useState(false);

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

    return (
        <div className="flex flex-col gap-md">
            {/* 1. Program Name */}
            <div>
                <div className="flex items-center gap-xs mb-xs">
                    <label className="label mb-0">Program Name</label>
                    <input
                        className="editable-label-input"
                        value={getVar('{name}')}
                        onChange={(e) => handleVarRename('{name}', e.target.value)}
                    />
                </div>
                <input
                    className="input"
                    value={program.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Tact Colors"
                />
            </div>

            {/* 2. Goal Description */}
            <div>
                <div className="flex items-center gap-xs mb-xs">
                    <label className="label mb-0">Goal Description</label>
                    <input
                        className="editable-label-input"
                        value={getVar('{goal}')}
                        onChange={(e) => handleVarRename('{goal}', e.target.value)}
                    />
                </div>
                <textarea
                    className="input"
                    value={program.goal}
                    onChange={(e) => handleChange('goal', e.target.value)}
                    rows={2}
                    style={{ resize: 'vertical' }}
                    placeholder="e.g. Client will tact colors when presented with a stimulus..."
                />
            </div>

            {/* 3. Goal Status */}
            <div style={{ position: 'relative' }}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-xs">
                        <label className="label mb-0">Goal Status</label>
                        <input
                            className="editable-label-input"
                            value={getVar('{status_sentence}')}
                            onChange={(e) => handleVarRename('{status_sentence}', e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-ghost"
                        onClick={() => setShowStatusTemplate(!showStatusTemplate)}
                        style={{ fontSize: '0.75rem', padding: '2px 8px' }}
                    >
                        {showStatusTemplate ? 'Hide Templates' : 'Templates'}
                    </button>
                </div>

                {showStatusTemplate && (
                    <div style={{ background: 'var(--color-bg)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-sm)', border: '1px solid var(--color-border)' }}>
                        <div className="flex flex-col gap-md">
                            <TemplateEditor
                                label="Mastered"
                                value={program.masteredTemplate}
                                onChange={(val) => handleChange('masteredTemplate', val)}
                                defaultValue={globalSettings.defaultMasteredTemplate}
                                variables={getDynamicVars('status')}
                                rows={2}
                            />

                            <div className="flex gap-md">
                                <div style={{ flex: 1 }}>
                                    <TemplateEditor
                                        label="On Hold"
                                        value={program.onHoldTemplate}
                                        onChange={(val) => handleChange('onHoldTemplate', val)}
                                        defaultValue={globalSettings.defaultOnHoldTemplate}
                                        variables={getDynamicVars('status')}
                                        rows={1}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <TemplateEditor
                                        label="Not Introduced"
                                        value={program.notIntroducedTemplate}
                                        onChange={(val) => handleChange('notIntroducedTemplate', val)}
                                        defaultValue={globalSettings.defaultNotIntroducedTemplate}
                                        variables={getDynamicVars('status')}
                                        rows={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <select
                    className="input"
                    value={program.status || 'in-progress'}
                    onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value="in-progress">In Progress</option>
                    <option value="mastered">Mastered</option>
                    <option value="on-hold">On Hold</option>
                    <option value="not-introduced">Not Introduced</option>
                </select>
            </div>

            {/* 4. Barriers */}
            <div>
                <div className="flex items-center gap-xs mb-xs">
                    <label className="label mb-0">Barriers</label>
                    <input
                        className="editable-label-input"
                        value={getVar('{barriers}')}
                        onChange={(e) => handleVarRename('{barriers}', e.target.value)}
                    />
                </div>
                <textarea
                    className="input"
                    value={program.barriers || ''}
                    onChange={(e) => handleChange('barriers', e.target.value)}
                    rows={2}
                    placeholder="e.g. Maladaptive behaviors, lack of attention..."
                />
            </div>

            {/* 5. Clinical Plan */}
            <div>
                <div className="flex items-center gap-xs mb-xs">
                    <label className="label mb-0">Clinical Plan</label>
                    <input
                        className="editable-label-input"
                        value={getVar('{plan}')}
                        onChange={(e) => handleVarRename('{plan}', e.target.value)}
                    />
                </div>
                <input
                    className="input"
                    value={program.plan}
                    onChange={(e) => handleChange('plan', e.target.value)}
                    placeholder="e.g. Continue current plan"
                />
            </div>
        </div>
    );
}
