import * as vscode from 'vscode';

import { openAsMarkdown } from './commands/openAsMarkdown';
import { convertTo } from './commands/convertTo';
import { createDocx } from './commands/createDocx';

import { saveAsDocx } from './commands/saveAsDocx';

export function activate(context: vscode.ExtensionContext) {
	console.log('Document Markdown Bridge is now active');

	const openWaiter = vscode.commands.registerCommand('docx.openAsMarkdown', openAsMarkdown);
	const convertWaiter = vscode.commands.registerCommand('docx.convertTo', convertTo);
	const createWaiter = vscode.commands.registerCommand('docx.createDocx', (uri) => createDocx(context, uri));

    const saveListener = vscode.workspace.onDidSaveTextDocument((document) => saveAsDocx(document.uri));

	context.subscriptions.push(openWaiter);
    context.subscriptions.push(convertWaiter);
    context.subscriptions.push(createWaiter);

    context.subscriptions.push(saveListener);
}

export function deactivate() {}