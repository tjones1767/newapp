import React from 'react';

export function VariableLegend({ variables, onInsert }) {
    return (
        <div className="flex gap-xs flex-wrap mt-sm">
            {variables.map((v) => (
                <button
                    key={v.name}
                    className="variable-chip"
                    onClick={() => onInsert(v.name)}
                    title={`${v.description} (Example: ${v.example})`}
                    type="button"
                >
                    {v.name}
                </button>
            ))}
        </div>
    );
}
