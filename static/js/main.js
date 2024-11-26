require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});

require(['vs/editor/editor.main'], function() {
    window.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        value: '# Start By Writing Your Code Below',
        language: 'python',
        theme: 'vs-light',
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        readOnly: false
    });

    monaco.editor.defineTheme('leetcode-light', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#ffffff',
        }
    });

    monaco.editor.setTheme('leetcode-light');
});

function appendToTerminal(text, type = 'normal') {
    const terminal = document.getElementById('terminal-content');
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function runCode() {
    appendToTerminal('Running code...', 'normal');
    setTimeout(() => {
        appendToTerminal('Code executed successfully!', 'success');
    }, 1000);
}

function submitCode() {
    appendToTerminal('Submitting solution...', 'normal');
    setTimeout(() => {
        appendToTerminal('Solution submitted successfully!', 'success');
    }, 1500);
}

document.querySelector('.language-select').addEventListener('change', function(e) {
    const language = e.target.value;
    const starterCode = {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return null;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`
    };

    monaco.editor.getModels()[0].setValue(starterCode[language]);
    monaco.editor.setModelLanguage(monaco.editor.getModels()[0], language);
});

async function fetchProblem() {
    const apiUrl = '/get-problems';
    try {
        const response = await fetch(apiUrl, { method: 'POST' });
        if (!response.ok) {
            throw new Error('Failed to fetch problem');
        }
        const data = await response.json();
        const problem = data.questions ? data.questions.split('\n\n')[0] : 'No questions available';
        const problemParts = problem.split('\n');

        document.getElementById('problem-title').innerText = problemParts[0]?.split(': ')[1] || 'Untitled';
        document.getElementById('problem-description').innerHTML = `<pre>${problemParts.slice(1).join('\n')}</pre>`;
    } catch (error) {
        console.error('Error fetching problem:', error);
        document.getElementById('problem-title').innerText = 'Error loading problem';
    }
}

window.onload = fetchProblem;

