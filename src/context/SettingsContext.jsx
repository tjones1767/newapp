import React, { createContext, useState, useEffect, useContext } from 'react';
import { DEFAULTS } from '../constants';

const SettingsContext = createContext();

export function useSettings() {
    return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('bcba_settings');
        const parsed = saved ? JSON.parse(saved) : {};
        return {
            defaultTemplate: parsed.defaultTemplate || DEFAULTS.template,
            defaultMasteredTemplate: parsed.defaultMasteredTemplate || DEFAULTS.masteredTemplate,
            defaultOnHoldTemplate: parsed.defaultOnHoldTemplate || DEFAULTS.onHoldTemplate,
            defaultNotIntroducedTemplate: parsed.defaultNotIntroducedTemplate || DEFAULTS.notIntroducedTemplate,
            defaultPromptsTemplate: parsed.defaultPromptsTemplate || DEFAULTS.promptsTemplate,
            defaultTargetTemplate: parsed.defaultTargetTemplate || DEFAULTS.targetTemplate,
            variableMap: parsed.variableMap || {}
        };
    });

    useEffect(() => {
        localStorage.setItem('bcba_settings', JSON.stringify(settings));
    }, [settings]);

    const updateSettings = (newSettings) => {
        setSettings(newSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}
