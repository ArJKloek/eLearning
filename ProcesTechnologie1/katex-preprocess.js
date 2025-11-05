function katexPreProcess(math) {
  // Skip wrapping text inside \ce{}, \begin{}, and \end{} arguments
  // Commands are preserved but their arguments are processed
  var result = '';
  var i = 0;
  while (i < math.length) {
    if (math[i] === '\\' && i + 1 < math.length) {
      // Found a command - extract command name
      var cmdStart = i;
      i++; // skip backslash
      var cmdNameStart = i;
      while (i < math.length && /[a-zA-Z]/.test(math[i])) {
        i++;
      }
      var cmdName = math.substring(cmdNameStart, i);
      result += math.substring(cmdStart, i);
      
      // Skip processing for \ce{}, \begin{}, and \end{} arguments
      if (cmdName === 'ce' || cmdName === 'begin' || cmdName === 'end') {
        // Skip whitespace
        while (i < math.length && /\s/.test(math[i])) {
          result += math[i];
          i++;
        }
        // Copy the argument(s) without processing
        while (i < math.length && math[i] === '{') {
          var braceCount = 1;
          result += '{';
          i++;
          while (i < math.length && braceCount > 0) {
            if (math[i] === '{') braceCount++;
            else if (math[i] === '}') braceCount--;
            result += math[i];
            i++;
          }
        }
      }
      // For all other commands (including \dfrac), continue processing
    } else if (/[A-Za-z]/.test(math[i])) {
      // Found a letter - collect the word
      var wordStart = i;
      while (i < math.length && /[A-Za-z]/.test(math[i])) {
        i++;
      }
      var word = math.substring(wordStart, i);
      // Wrap ALL letters in \text{}, including single letters
      result += '\\text{' + word + '}';
    } else {
      // Other character - keep as is
      result += math[i];
      i++;
    }
  }
  return result;
}
