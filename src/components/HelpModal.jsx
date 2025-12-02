import React from 'react';

export function HelpModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                <div className="flex justify-between items-center mb-md">
                    <h2 className="text-xl font-bold">How to Use</h2>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>

                <div className="flex flex-col gap-md" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <section>
                        <h3 className="font-bold mb-xs">1. Create a Program</h3>
                        <p className="text-text-muted">
                            Click the <strong>+ New Program</strong> button in the sidebar to start a new progress note.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold mb-xs">2. Fill in Details</h3>
                        <p className="text-text-muted">
                            Enter the program name, goal, status, barriers, and clinical plan.
                            The <strong>Live Preview</strong> on the right will update automatically as you type.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold mb-xs">3. Add Targets</h3>
                        <p className="text-text-muted">
                            Scroll down to the <strong>Targets</strong> section and click <strong>+ Add Target</strong>.
                            Enter data for each target (percentage, sessions, etc.).
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold mb-xs">4. Customize Templates (Advanced)</h3>
                        <p className="text-text-muted">
                            If you need to change how the paragraph is worded, look for <strong>Template</strong> buttons
                            next to specific sections. You can use variables like <code>{'{name}'}</code> or <code>{'{status}'}</code>
                            to insert your data dynamically.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold mb-xs">5. Export</h3>
                        <p className="text-text-muted">
                            Once you are happy with the note, click <strong>Copy to Clipboard</strong> or <strong>Export to Word</strong>
                            in the Live Preview panel.
                        </p>
                    </section>
                </div>

                <div className="flex justify-end mt-md pt-sm border-t">
                    <button className="btn btn-primary" onClick={onClose}>Got it</button>
                </div>
            </div>
        </div>
    );
}
