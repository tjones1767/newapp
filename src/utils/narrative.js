import { DEFAULTS } from '../constants';

export function generateNarrative(program, globalSettings) {
    if (!program) return '';

    const getVar = (key) => (globalSettings.variableMap && globalSettings.variableMap[key]) || key;

    // Status Sentence Logic
    let statusSentence = '';
    const masteredTemplate = program.masteredTemplate || globalSettings.defaultMasteredTemplate || DEFAULTS.masteredTemplate;
    const onHoldTemplate = program.onHoldTemplate || globalSettings.defaultOnHoldTemplate || DEFAULTS.onHoldTemplate;
    const notIntroducedTemplate = program.notIntroducedTemplate || globalSettings.defaultNotIntroducedTemplate || DEFAULTS.notIntroducedTemplate;

    const goalSkill = program.goal ? program.goal.replace(/Client will /i, '') : 'maintain skill';

    if (program.status === 'mastered') {
        statusSentence = masteredTemplate
            .replace(/{goal}/g, program.goal || '')
            .replace(/{goal_skill}/g, goalSkill);
    } else if (program.status === 'on-hold') {
        statusSentence = onHoldTemplate
            .replace(/{goal}/g, program.goal || '')
            .replace(/{goal_skill}/g, goalSkill);
    } else if (program.status === 'not-introduced') {
        statusSentence = notIntroducedTemplate
            .replace(/{goal}/g, program.goal || '')
            .replace(/{goal_skill}/g, goalSkill);
    }

    // Target Summaries
    const targetTemplate = program.targetTemplate || globalSettings.defaultTargetTemplate || DEFAULTS.targetTemplate;

    const targetSummaries = (program.targets || []).map(target => {
        if (!target.name) return null;

        let percentage = 0;
        if (target.mode === 'trial') {
            const correct = parseFloat(target.correct) || 0;
            const total = parseFloat(target.total) || 0;
            if (total > 0) {
                percentage = Math.round((correct / total) * 100);
            }
        } else {
            const percs = (target.percentages || '').split(',').map(p => parseFloat(p.trim())).filter(n => !isNaN(n));
            if (percs.length > 0) {
                const sum = percs.reduce((a, b) => a + b, 0);
                percentage = Math.round(sum / percs.length);
            }
        }

        return targetTemplate
            .replace(/{target}/g, target.name)
            .replace(/{verb}/g, target.verb || 'provided')
            .replace(/{percentage}/g, percentage)
            .replace(/{sessions}/g, target.sessions);
    }).filter(Boolean);

    const targetsSummary = targetSummaries.join('. ') + (targetSummaries.length > 0 ? '.' : '');

    // Prompts string
    const promptsList = Array.isArray(program.prompts) ? program.prompts.join(', ') : (program.prompts || '');
    const promptsTemplate = program.promptsTemplate || globalSettings.defaultPromptsTemplate || DEFAULTS.promptsTemplate;
    const promptsString = promptsList ? promptsTemplate.replace(/{prompts}/g, promptsList) : '';

    // Main Template
    const template = program.template || globalSettings.defaultTemplate || DEFAULTS.template;

    let narrative = template
        .replace(new RegExp(getVar('{name}'), 'g'), program.name || '')
        .replace(new RegExp(getVar('{goal}'), 'g'), program.goal || '')
        .replace(new RegExp(getVar('{status_sentence}'), 'g'), statusSentence)
        .replace(new RegExp(getVar('{plan}'), 'g'), program.plan || '')
        .replace(new RegExp(getVar('{prompts}'), 'g'), promptsString)
        .replace(new RegExp(getVar('{barriers}'), 'g'), program.barriers || '')
        .replace(new RegExp(getVar('{targets_summary}'), 'g'), targetsSummary);

    // Clean up double spaces
    return narrative.replace(/\s+/g, ' ').trim();
}
