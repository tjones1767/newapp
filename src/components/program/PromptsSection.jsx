import React, { useState } from 'react';
import { PROMPT_OPTIONS, VARS } from '../../constants';
import { useSettings } from '../../context/SettingsContext';
import { TemplateEditor } from './TemplateEditor';

export function PromptsSection({ program, onUpdate, onGlobalVarRename }) {
    const { settings: globalSettings } = useSettings();
    const [showPromptsTemplate, setShowPromptsTemplate] = useState(false);

    const getVar = (key) => (globalSettings.variableMap && globalSettings.variableMap[key]) || key;

    const handleChange = (field, value) => {
        onUpdate(program.id, { ...program, [field]: value });
    };

    const handlePromptChange = (prompt) => {
        const currentPrompts = Array.isArray(program.prompts) ? program.prompts : [];
        const newPrompts = currentPrompts.includes(prompt)
            ? currentPrompts.filter(p => p !== prompt)
            : [...currentPrompts, prompt];
        handleChange('prompts', newPrompts);
    };

    const handleVarRename = (oldKey, newName) => {
        onGlobalVarRename(oldKey, newName);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-xs">
                    <label className="label mb-0">Prompts Used</label>
                    <input
                        className="editable-label-input"
                        value={getVar('{prompts}')}
                        onChange={(e) => handleVarRename('{prompts}', e.target.value)}
                    />
                </div>
                <button
                    className="btn btn-ghost"
                    onClick={() => setShowPromptsTemplate(!showPromptsTemplate)}
                    style={{ fontSize: '0.75rem', padding: '2px 8px' }}
                >
                    {showPromptsTemplate ? 'Hide Template' : 'Template'}
                </button>
            </div>

            {showPromptsTemplate && (
                <div style={{ background: 'var(--color-bg)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-sm)', border: '1px solid var(--color-border)' }}>
                    <div className="flex justify-between items-center mb-xs">
                        <label className="label mb-0">Prompts Template</label>
                    </div>
                    <TemplateEditor
                        label=""
                        value={program.promptsTemplate}
                        onChange={(val) => handleChange('promptsTemplate', val)}
                        defaultValue={globalSettings.defaultPromptsTemplate}
                        variables={[]} // No variables for prompts template? Wait, it uses {prompts}
                        rows={1}
                    />
                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Use <code>{'{prompts}'}</code> to insert the list of selected prompts.
                    </p>
                </div>
            )}

            <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                {PROMPT_OPTIONS.map(option => (
                    <label key={option} className="flex items-center gap-sm" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input
                            type="checkbox"
                            checked={(Array.isArray(program.prompts) ? program.prompts : []).includes(option)}
                            onChange={() => handlePromptChange(option)}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
}
