import * as vscode from 'vscode';

import { openAsMarkdown } from './commands/openAsMarkdown';
import { saveAsDocx } from './commands/saveAsDocx';

export function activate(context: vscode.ExtensionContext) {
	console.log('Document Markdown Bridge is now active');

	const openWaiter = vscode.commands.registerCommand('docx.openAsMarkdown', openAsMarkdown);
    const saveListener = vscode.workspace.onDidSaveTextDocument((document) => saveAsDocx(document.uri.fsPath));

	context.subscriptions.push(openWaiter);
    context.subscriptions.push(saveListener);
}

export function deactivate() {}
