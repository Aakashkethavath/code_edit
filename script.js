const codeEditor = document.getElementById('code-editor');
const languageSelect = document.getElementById('language-select');
const runButton = document.getElementById('run-button');
const output = document.getElementById('output');

const defaultEditorSettings = {
  lineNumbers: true,
  matchBrackets: true,
  tabSize: 2,
  indentUnit: 2,
  theme: 'dracula',
  lineWrapping: true,
};

const editor = CodeMirror.fromTextArea(codeEditor, {
  ...defaultEditorSettings,
  mode: 'html',
});

languageSelect.addEventListener('change', (e) => {
  const language = e.target.value;
  editor.setOption('mode', language);
});

runButton.addEventListener('click', updateOutput); // Run code when RUN button is clicked

function updateOutput() {
  const code = editor.getValue();
  const language = languageSelect.value;

  let content = '';
  switch (language) {
    case 'html':
      content = code;
      break;
    case 'css':
      content = `<style>${code}</style>`;
      break;
    case 'javascript':
      content = `<script>${code}<\/script>`;
      break;
  }

  output.srcdoc = `
    <html>
      <head>
        <style>body { font-family: Arial, sans-serif; }</style>
        ${language === 'css' ? content : ''}
      </head>
      <body>
        ${language === 'html' ? content : ''}
        ${language === 'javascript' ? content : ''}
      </body>
    </html>
  `;
}

// Initialize with some example HTML code
editor.setValue('<h1>Hello, World!</h1>');
updateOutput(); // Display the default code initially
