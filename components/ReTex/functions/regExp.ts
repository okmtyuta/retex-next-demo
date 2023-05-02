export const DOLLAR_REGEX = /\$[\s\S]*\$/
export const ALIGN_REGEX = /\\begin{align}[\s\S]*\\end{align}/
export const DOLLAR_WITHOUT_ALIGN_REGEX = /(?<!\\begin{align}[\s\S]*\\end{align}[\s\S]*)\$([\s\S]*?)\$/
export const ALIGN_WITHOUT_DOLLAR_REGEX = /(?<!\$[\s\S]*\$[\s\S]*)\\begin{align}([\s\S]*?)\\end{align}/