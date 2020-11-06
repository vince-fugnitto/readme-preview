import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
	const activated = await activateMarkdownExtension();
	if (!activated) {
		return;
	}
	const workspaceRoot = vscode.workspace.workspaceFolders![0].uri;
	const readmeUri = vscode.Uri.parse(`${workspaceRoot}/README.md`);

	let disposable = vscode.commands.registerCommand('markdown-preview.previewReadme', async () => {
		vscode.commands.executeCommand('markdown.showPreview', readmeUri);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

/**
 * Activate the `vscode.markdown-language-features` extension if it exists.
 */
export async function activateMarkdownExtension(): Promise<boolean> {
	const extensions = vscode.extensions.all;
	const markdownExt = extensions.find(ext => ext.id === 'vscode.markdown-language-features');
	if (markdownExt) {
		await markdownExt?.activate();
		return true;
	}
	return false;
}
