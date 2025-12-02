import React, { useRef } from 'react';
import { VariableLegend } from '../common/VariableLegend';

export function TemplateEditor({ label, value, onChange, defaultValue, variables, rows = 2 }) {
    const textareaRef = useRef(null);

    const handleInsert = (val) => {
        const currentVal = value || defaultValue || '';
        const input = textareaRef.current;
        if (input) {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const newVal = currentVal.substring(0, start) + val + currentVal.substring(end);
            onChange(newVal);
            setTimeout(() => {
                input.focus();
                input.setSelectionRange(start + val.length, start + val.length);
            }, 0);
        } else {
            onChange(currentVal + val);
        }
    };

    const handleReset = () => {
        if (window.confirm('Reset this template to default?')) {
            onChange(defaultValue);
        }
    };

    return (
        <div style={{ background: 'var(--color-bg)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)', border: '1px solid var(--color-border)' }}>
            <div className="flex justify-between items-center mb-xs">
                <label className="label mb-0">{label}</label>
                <button className="btn btn-ghost" style={{ fontSize: '0.75rem', padding: '2px 8px' }} onClick={handleReset}>Reset</button>
            </div>
            {rows > 1 ? (
                <textarea
                    ref={textareaRef}
                    className="input"
                    value={value || defaultValue}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                />
            ) : (
                <input
                    ref={textareaRef}
                    className="input"
                    value={value || defaultValue}
                    onChange={(e) => onChange(e.target.value)}
                    style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                />
            )}
            <VariableLegend
                variables={variables}
                onInsert={handleInsert}
            />
        </div>
    );
}
