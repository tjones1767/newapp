export const PROMPT_OPTIONS = [
    'Verbal', 'Gestural', 'Modeling', 'Physical', 'Positional', 'Visual', 'Independent'
];

export const DEFAULTS = {
    template: "{name} {goal} {status_sentence} {barriers} {plan} {prompts} {targets_summary}",
    targetTemplate: "Client {verb} {target} in {percentage}% across {sessions} sessions",
    masteredTemplate: "Client mastered {goal}. This goal was generalized across people and settings. The clinical team will continue to provide opportunities for client to {goal_skill} and reinforce correct responses.",
    onHoldTemplate: "Goal {goal_skill} is currently on hold.",
    notIntroducedTemplate: "Goal {goal_skill} has not yet been introduced.",
    promptsTemplate: "Prompts used: {prompts}."
};

export const VARS = {
    main: [
        { name: '{name}', description: 'Program Name', example: 'Tact Colors' },
        { name: '{goal}', description: 'Full Goal Description', example: 'Client will tact colors...' },
        { name: '{status_sentence}', description: 'Generated Status Sentence', example: 'Client mastered...' },
        { name: '{barriers}', description: 'Barriers to Progress', example: 'Non-compliance...' },
        { name: '{plan}', description: 'Clinical Plan', example: 'Use differential reinforcement...' },
        { name: '{prompts}', description: 'List of Prompts Used', example: 'Verbal, Visual' },
        { name: '{targets_summary}', description: 'Summary of all targets', example: 'Client provided Red...' }
    ],
    target: [
        { name: '{verb}', description: 'Target Verb', example: 'provided' },
        { name: '{target}', description: 'Target Name', example: 'Red' },
        { name: '{percentage}', description: 'Calculated Percentage', example: '80' },
        { name: '{sessions}', description: 'Number of Sessions', example: '3' }
    ],
    status: [
        { name: '{goal}', description: 'Full Goal Description', example: 'Client will tact colors...' },
        { name: '{goal_skill}', description: 'Skill Name (derived from goal)', example: 'tact colors' }
    ]
};
