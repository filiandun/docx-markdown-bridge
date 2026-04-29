import * as vscode from 'vscode';

import { convertPandoc } from '../services/pandocService';

export async function saveAsDocx(mdFilePath: string) {
    console.log("saveAsDocx", mdFilePath);

    if (!mdFilePath.endsWith('.docx.md')) {
        return;
    }

    try {
        const docxFilePath = mdFilePath.replace(/\.md$/, "");
        
        await convertPandoc(mdFilePath, docxFilePath);

        vscode.window.showInformationMessage(`Markdown's file ${mdFilePath} successfully was saved as Docx's file ${docxFilePath}`);
    }
    catch (err: any) {
        vscode.window.showErrorMessage(`Error: ${err.message || err}`);
    }
}