import * as vscode from 'vscode';
import * as path from 'path';

import { convertPandoc } from '../services/pandocService';

export async function saveAsDocx(uri: vscode.Uri) {
    console.log("saveAsDocx", uri.fsPath);
    
    const mdFilePath = uri.fsPath;
    
    if (!mdFilePath.endsWith('.docx.md')) {
        return;
    }
    
    const docxFilePath = mdFilePath.replace(/\.md$/, "");
    
    try {
        await convertPandoc(mdFilePath, docxFilePath);

        vscode.window.showInformationMessage(`DME: \'${path.basename(mdFilePath)}\' saved as \'${path.basename(docxFilePath)}\'`);
    }
    catch (err: any) {
        vscode.window.showErrorMessage(`DME: Error: ${err.message || err}`);
    }
}