import React, { useMemo } from 'react';
import { generateNarrative } from '../utils/narrative';
import { useSettings } from '../context/SettingsContext';

export function LivePreview({ program }) {
    const { settings: globalSettings } = useSettings();

    if (!program) return null;

    const narrative = useMemo(() => generateNarrative(program, globalSettings), [program, globalSettings]);

    const handleExport = () => {
        const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>
    `;

        const content = `
      <h2>${program.name}</h2>
      <p><strong>Goal:</strong> ${program.goal}</p>
      <p><strong>Narrative:</strong> ${narrative}</p>
      <hr/>
    `;

        const footer = "</body></html>";
        const sourceHTML = header + content + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${program.name || 'program'}-note.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
    };

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', overflowY: 'auto', height: '100%' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Live Preview</h2>

            <div style={{ background: 'var(--color-surface-hover)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)', flex: 1, overflowY: 'auto' }}>
                <p style={{ lineHeight: '1.6', fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
                    {narrative}
                </p>
            </div>

            <div className="flex gap-sm">
                <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => navigator.clipboard.writeText(narrative)}
                >
                    Copy to Clipboard
                </button>
                <button
                    className="btn btn-ghost"
                    style={{ flex: 1 }}
                    onClick={handleExport}
                >
                    Export to Word
                </button>
            </div>
        </div>
    );
}
