export function iconify(input = '') {
    const replacers = [
        {
            in: /\+/g,
            out: "plus"
        },
        {
            in: /\./g,
            out: "-dot-"
        },
        {
            in: /&/g,
            out: "-and-"
        },
        {
            in: ' ',
            out: ''
        },
        {
            in: '_',
            out: ''
        }
    ]
    let output = input.toLowerCase()
    replacers.forEach(replacer => {
        output = output.replace(replacer.in, replacer.out)
    })
    return output
}

//copy text to clipboard function
export function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
    } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
    ) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

export function groupElementsByN(data, n) {
    var group = [];
    for (var i = 0, j = 0; i < data.length; i++) {
        if (i >= n && i % n === 0) j++;
        group[j] = group[j] || [];
        group[j].push(data[i]);
    }
    return group;
}