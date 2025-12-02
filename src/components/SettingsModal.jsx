import React, { useState, useRef } from 'react';
import { VariableLegend } from './common/VariableLegend';
import { VARS } from '../constants';
import { useSettings } from '../context/SettingsContext';



export function SettingsModal({ onClose }) {
    const { settings, updateSettings } = useSettings();

    // Refs
    const mainRef = useRef(null);
    const masteredRef = useRef(null);
    const onHoldRef = useRef(null);
    const notIntroducedRef = useRef(null);
    const promptsRef = useRef(null);
    const targetRef = useRef(null);

    const getVar = (key) => (settings.variableMap && settings.variableMap[key]) || key;

    const handleChange = (field, value) => {
        updateSettings({ ...settings, [field]: value });
    };

    const handleInsert = (field, value, ref) => {
        const currentVal = settings[field] || '';
        const input = ref.current;
        if (input) {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const newVal = currentVal.substring(0, start) + value + currentVal.substring(end);
            handleChange(field, newVal);
            setTimeout(() => {
                input.focus();
                input.setSelectionRange(start + value.length, start + value.length);
            }, 0);
        } else {
            handleChange(field, currentVal + value);
        }
    };

    // Dynamic Variables for Legend
    const getDynamicVars = (type) => {
        return (VARS[type] || []).map(v => ({ ...v, name: getVar(v.name) }));
    };

    const handleVarRename = (oldKey, newName) => {
        const newMap = { ...settings.variableMap, [oldKey]: newName };
        handleChange('variableMap', newMap);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                <div className="flex justify-between items-center mb-md border-b pb-sm">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Global Settings</h2>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>

                <div style={{ overflowY: 'auto', flex: 1, paddingRight: 'var(--space-sm)' }}>

                    {/* Main Template Section */}
                    <div className="mb-md p-md border border-border rounded-md bg-bg">
                        <h3 className="text-lg font-semibold mb-sm text-primary">Main Narrative Template</h3>
                        <textarea
                            ref={mainRef}
                            className="input"
                            rows={4}
                            value={settings.defaultTemplate}
                            onChange={(e) => handleChange('defaultTemplate', e.target.value)}
                            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                        />
                        <VariableLegend
                            variables={getDynamicVars('main')}
                            onInsert={(val) => handleInsert('defaultTemplate', val, mainRef)}
                        />
                    </div>

                    {/* Status Templates Section */}
                    <div className="mb-md p-md border border-border rounded-md bg-bg">
                        <h3 className="text-lg font-semibold mb-md text-primary">Status Templates</h3>
                        <div className="flex flex-col gap-md">
                            <div>
                                <label className="label">Default Mastered Template</label>
                                <textarea
                                    ref={masteredRef}
                                    className="input"
                                    rows={2}
                                    value={settings.defaultMasteredTemplate}
                                    onChange={(e) => handleChange('defaultMasteredTemplate', e.target.value)}
                                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                                />
                                <VariableLegend
                                    variables={getDynamicVars('status')}
                                    onInsert={(val) => handleInsert('defaultMasteredTemplate', val, masteredRef)}
                                />
                            </div>
                            <div>
                                <label className="label">Default On Hold Template</label>
                                <input
                                    ref={onHoldRef}
                                    className="input"
                                    value={settings.defaultOnHoldTemplate}
                                    onChange={(e) => handleChange('defaultOnHoldTemplate', e.target.value)}
                                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                                />
                                <VariableLegend
                                    variables={getDynamicVars('status')}
                                    onInsert={(val) => handleInsert('defaultOnHoldTemplate', val, onHoldRef)}
                                />
                            </div>
                            <div>
                                <label className="label">Default Not Introduced Template</label>
                                <input
                                    ref={notIntroducedRef}
                                    className="input"
                                    value={settings.defaultNotIntroducedTemplate}
                                    onChange={(e) => handleChange('defaultNotIntroducedTemplate', e.target.value)}
                                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                                />
                                <VariableLegend
                                    variables={getDynamicVars('status')}
                                    onInsert={(val) => handleInsert('defaultNotIntroducedTemplate', val, notIntroducedRef)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Prompts Template Section */}
                    <div className="mb-md p-md border border-border rounded-md bg-bg">
                        <h3 className="text-lg font-semibold mb-sm text-primary">Prompts Template</h3>
                        <input
                            ref={promptsRef}
                            className="input"
                            value={settings.defaultPromptsTemplate}
                            onChange={(e) => handleChange('defaultPromptsTemplate', e.target.value)}
                            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                        />
                        <p className="text-sm text-text-muted mt-xs">Use <code>{'{prompts}'}</code> to insert the list.</p>
                    </div>

                    {/* Target Summary Section */}
                    <div className="mb-md p-md border border-border rounded-md bg-bg">
                        <h3 className="text-lg font-semibold mb-sm text-primary">Target Summary Template</h3>
                        <input
                            ref={targetRef}
                            className="input"
                            value={settings.defaultTargetTemplate}
                            onChange={(e) => handleChange('defaultTargetTemplate', e.target.value)}
                            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                        />
                        <VariableLegend
                            variables={getDynamicVars('target')}
                            onInsert={(val) => handleInsert('defaultTargetTemplate', val, targetRef)}
                        />
                    </div>

                    {/* Variable Map Editing */}
                    <div className="mb-md p-md border border-border rounded-md bg-bg">
                        <h3 className="text-lg font-semibold mb-sm text-primary">Variable Names</h3>
                        <p className="text-sm text-text-muted mb-md">
                            Rename variables globally.
                        </p>
                        <div className="grid grid-cols-2 gap-md">
                            {Object.entries(VARS).flatMap(([category, vars]) => vars).map(v => (
                                <div key={v.name} className="flex flex-col gap-xs">
                                    <label className="label">{v.description}</label>
                                    <input
                                        className="input"
                                        value={getVar(v.name)}
                                        onChange={(e) => handleVarRename(v.name, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-md pt-sm border-t">
                    <button className="btn btn-primary" onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    );
}
