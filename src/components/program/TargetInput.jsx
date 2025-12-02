import React from 'react';

export function TargetInput({ target, onUpdate, onDelete }) {
    const handleChange = (field, value) => {
        onUpdate({ ...target, [field]: value });
    };

    return (
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
            <div className="flex justify-between items-start mb-sm">
                <div style={{ flex: 1, marginRight: 'var(--space-md)' }}>
                    <input
                        className="input"
                        value={target.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Target Name (e.g. Red)"
                        style={{ fontWeight: 'bold' }}
                    />
                </div>
                <button className="btn btn-ghost btn-danger" onClick={onDelete} style={{ padding: '4px 8px' }}>✕</button>
            </div>

            <div className="grid grid-cols-2 gap-sm mb-sm">
                <div>
                    <label className="label" style={{ fontSize: '0.8rem' }}>Verb</label>
                    <input
                        className="input"
                        value={target.verb}
                        onChange={(e) => handleChange('verb', e.target.value)}
                        placeholder="e.g. provided"
                    />
                </div>
                <div>
                    <label className="label" style={{ fontSize: '0.8rem' }}>Mode</label>
                    <select
                        className="input"
                        value={target.mode}
                        onChange={(e) => handleChange('mode', e.target.value)}
                    >
                        <option value="trial">Trial Count</option>
                        <option value="percentage">Percentage</option>
                        <option value="frequency">Frequency</option>
                        <option value="duration">Duration</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-sm">
                <div>
                    <label className="label" style={{ fontSize: '0.8rem' }}>Correct/Count</label>
                    <input
                        className="input"
                        type="number"
                        value={target.correct}
                        onChange={(e) => handleChange('correct', e.target.value)}
                        placeholder="0"
                    />
                </div>
                {target.mode === 'trial' && (
                    <div>
                        <label className="label" style={{ fontSize: '0.8rem' }}>Total Trials</label>
                        <input
                            className="input"
                            type="number"
                            value={target.total}
                            onChange={(e) => handleChange('total', e.target.value)}
                            placeholder="0"
                        />
                    </div>
                )}
                <div>
                    <label className="label" style={{ fontSize: '0.8rem' }}>Sessions</label>
                    <input
                        className="input"
                        type="number"
                        value={target.sessions || 1}
                        onChange={(e) => handleChange('sessions', e.target.value)}
                        min="1"
                        max="3"
                    />
                </div>
            </div>
        </div>
    );
}
