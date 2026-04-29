import * as vscode from 'vscode';

import { convertPandoc } from '../services/pandocService';

export async function openAsMarkdown(uri?: vscode.Uri) {
    console.log('openAsMarkDown');
    
    try {
        let targetUri = uri;

        if (!targetUri) { // это если вдруг команда вызвана (ctrl + shift + p), а не через menus
            console.log('uri is null');

            const editor = vscode.window.activeTextEditor;

            if (!editor) {
                throw new Error("Cannot find active document");
            }

            targetUri = editor.document.uri;
        }

        const docxFilePath = targetUri!.fsPath;
        const mdFilePath = docxFilePath + ".md";
    
        await convertPandoc(docxFilePath, mdFilePath);

        const mdFileUri = vscode.Uri.file(mdFilePath);

        await vscode.commands.executeCommand('vscode.open', mdFileUri);

        vscode.window.showInformationMessage(`Docx's file ${docxFilePath} successfully was open as Markdown's file ${mdFilePath}`);
    }
    catch (err: any) {
        vscode.window.showErrorMessage(`Error: ${err.message || err}`);
    }
}