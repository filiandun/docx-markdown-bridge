import * as vscode from 'vscode';

export async function resolveUri(uri?:vscode.Uri): Promise<vscode.Uri | undefined>  {
    if (uri) { return uri; } // uri будет null, если вызов происходит через command pallete (а не через menus)  
   
    const editor = vscode.window.activeTextEditor;

    if (editor) { // если редактор не дефолтный (кастомный с расширения? например), то editor будет null
        return editor.document.uri;
    }

    const uris = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectMany: false
    });

    return uris?.[0];
}